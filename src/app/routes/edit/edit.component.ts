import { Component, OnInit, NgModule } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { environment } from "../../../environments/environment";
import { RequestService } from "../../RequestService/requests";
import { resolveCoverImage } from "../../shared/shared";
import { CURRENT_YEAR, MEDIA_URI } from "../../config";
declare var $: any;

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  page: any = {};
  departments: string[] = [];
  categories: string[] = [];
  allTags: string[] = [];
  editors: string[] = [];
  allUsers: any[] = [];
  MEDIA_URI: string = MEDIA_URI;
  public getCoverImage: any = resolveCoverImage;

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.requestService.get( ('/pages/admin/' + params.pageURL), (data) => {
        this.page = data;
        this.editors = data.editors;
      }, null );
    });
    this.requestService.get('/pages/categories', (data)=> {
      this.categories = data.categories;
    }, null)
    this.requestService.get('/pages/departments', (data)=> {
      this.departments = data.departments;
    }, null)
    this.requestService.get('/pages/tags', (data) => this.allTags = data.tags, null);
    this.requestService.get('/search/all', (data) => {
      this.allUsers = data.results.map((user)=> {
        user.value = user.username;
        user.display = user.full_name;
        return user;
      });
    }, null);

  }

  ngOnInit() {
    this.froalaSetup()
  }

  save(onSucessfulSave) {
    // Remove unwanted attributes from JSON.
    let ignoredKeys = ["updated_at", "current", "created", "url", "editors"];
    let filteredPage = Object.assign({}, this.page);
    for(let i in ignoredKeys){
      delete filteredPage[ignoredKeys[i]];
    }

    //Add editors as an array of username strings.
    filteredPage.editors = this.editors.map((user: any) => {
      if (typeof(user) == "string") { return user }
      return user.username;
    })

    // Send New Page to server.
    this.requestService.post('/pages/admin/' + this.page.url, filteredPage, (data)=> {
      if(onSucessfulSave && typeof(onSucessfulSave) == "function") {
        onSucessfulSave()
      }
    }, (error) => {
      alert(error.message);
    });
  }

  preview() {
    this.save(() => {
      this.router.navigate(["admin", this.page.url]);
    })
  }

  imageHandler(event) {
    var files = event.target.files;
    if (files.length >= 1){
      this.requestService.uploadImage(event.target.files[0], (data) => {
        this.page.cover_image = data.media_URI;
      }, (er) => console.log(er));
    }
  }

  //The configuration object for Forala
  // TODO create endpoint for fileUploadURL on server
  public options: Object = {
    imageUploadURL: environment.SERVER_URL + '/pages/media/upload_image',
    fileUploadURL: environment.SERVER_URL + '/pages/media/upload_file',
    imageManagerLoadURL: environment.SERVER_URL + '/pages/media/load_images',
    toolbarButtons: [
      'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough',
      'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color',
      'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align',
      'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink',
      'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
      'emoticons', 'specialCharacters', 'insertHR', 'selectAll',
      'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo',
      '|', 'insert_profile'
    ],
    toolbarButtonsSM: [
      'fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize',
      'insertLink', 'insertImage', 'insertTable', 'undo', 'redo',
      '|', 'insert_profile'
    ],
    toolbarButtonsXS: [
      'bold', 'italic', 'fontFamily', 'fontSize', 'undo', 'redo',
      '|', 'insert_profile'
    ],
  };

  froalaSetup() {
    // Set CURRENT_YEAR and SERVER_URL variable in local storage
    localStorage.setItem("CURRENT_YEAR", CURRENT_YEAR);
    localStorage.setItem("SERVER_URL", environment.SERVER_URL);

        // Define popup template.
    $.extend($.FroalaEditor.POPUP_TEMPLATES, {
      'customPlugin.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
    });
    // Define popup buttons.
    $.extend($.FroalaEditor.DEFAULTS, {
      popupButtons: ['popupClose', '|', 'insertProfileButton'],
    });

    $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
      // Create custom popup.
      function initPopup () {
        // Load popup template.
        var template = $.FroalaEditor.POPUP_TEMPLATES.customPopup;
        if (typeof template == 'function') template = template.apply(editor);

        // Popup buttons.
        var popup_buttons = '';

        // Create the list of buttons.
        if (editor.opts.popupButtons.length > 1) {
          popup_buttons += '<div class="fr-buttons">';
          popup_buttons += editor.button.buildList(editor.opts.popupButtons);
          popup_buttons += '</div>';
        }

        // Load popup template.
        template = {
          buttons: popup_buttons,
          custom_layer: `<div class="form-group custom-layer" style="margin-top:5px;">
                           <label for="usr"><b>Username:</b></label>
                           <input type="text" class="form-control" id="usr">
                         </div>`
        };

        // Create popup.
        var $popup = editor.popups.create('customPlugin.popup', template);

        return $popup;
      }

      // Show the popup
      function showPopup () {
        // Get the popup object defined above.
        var $popup = editor.popups.get('customPlugin.popup');

        // If popup doesn't exist then create it.
        // To improve performance it is best to create the popup when it is first needed
        // and not when the editor is initialized.
        if (!$popup) $popup = initPopup();

        // Set the editor toolbar as the popup's container.
        editor.popups.setContainer('customPlugin.popup', editor.$tb);

        // This custom popup is opened by pressing a button from the editor's toolbar.
        // Get the button's object in order to place the popup relative to it.
        var $btn = editor.$tb.find('.fr-command[data-cmd="insert_profile"]');

        // Compute the popup's position.
        var left = $btn.offset().left + $btn.outerWidth() / 2;
        var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

        // Show the custom popup.
        // The button's outerHeight is required in case the popup needs to be displayed above it.
        editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
      }

      // Hide the custom popup.
      function hidePopup () {
        editor.popups.hide('customPlugin.popup');
      }

      // Methods visible outside the plugin.
      return {
        showPopup: showPopup,
        hidePopup: hidePopup
      }
    }

    // Define an icon and command for the button that opens the custom popup.
    $.FroalaEditor.DefineIcon('insert_profile', { NAME: 'plus'})
    $.FroalaEditor.RegisterCommand('insert_profile', {
      title: 'Insert Profile',
      undo: false,
      focus: false,
      popup: true,
      // Buttons which are included in the editor toolbar should have the plugin property set.
      plugin: 'customPlugin',
      callback: function () {
        if (!this.popups.isVisible('customPlugin.popup')) {
          this.customPlugin.showPopup();
        }
        else {
          if (this.$el.find('.fr-marker')) {
            this.events.disableBlur();
            this.selection.restore();
          }
          this.popups.hide('customPlugin.popup');
        }
      }
    });

    // Define custom popup close button icon and command.
    $.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
    $.FroalaEditor.RegisterCommand('popupClose', {
      title: 'Close',
      undo: false,
      focus: false,
      callback: function () {
        this.customPlugin.hidePopup();
      }
    });

    // Define custom popup 1.
    $.FroalaEditor.DefineIcon('insertProfileButton', { NAME: 'plus' });
    $.FroalaEditor.RegisterCommand('insertProfileButton', {
      title: 'Insert Profile',
      undo: false,
      focus: false,
      callback: function () {
        $.get(localStorage.getItem("SERVER_URL") + "/profile/" + localStorage.getItem("CURRENT_YEAR") + "/" + $('#usr').val(), (data, status) => {
            if (! data.hasOwnProperty('username')) {
              alert("Profile not found!")
              return;
            }
            let return_str = `
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="https://aswwu.com/media/img-sm/${data["photo"]}" alt="Profile Photo>
              <div class="card-body">
               <h5 class="card-title text-center"><b>${data["full_name"]}</b></h5>
               <a class="card-link text-center" href="mailto:${data["email"]}">${data["email"]}</a>
              </div>
            </div>
            `;
            this.html.insert(return_str);
          }
        );
      }
    });
  }
}
