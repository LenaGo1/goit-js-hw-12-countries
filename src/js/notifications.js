import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
// import * as PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';

defaultModules.set(PNotifyMobile, {});

function raise_error(content) {
    error({
        text: content
    });
}

export default raise_error;
// PNotify.error({
//   title: 'Oh No!',
//   text: 'Something terrible happened.'
// });




