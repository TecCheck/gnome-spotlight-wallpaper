/* 
 *This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const GETTEXT_DOMAIN = 'spotlight-wallpaper-extension';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            // Init Indicator
            super._init(0.0, _('Spotlight Wallpaper'));

            // Create box on panel with an icon and add it to the panel
            let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
            box.add_child(new St.Icon({
                icon_name: 'folder-pictures-symbolic',
                style_class: 'system-status-icon',
            }));
            this.add_child(box);

            // Add a Popup Menu to the indicator
            let info_item = new PopupMenu.PopupMenuItem(_('Show Wallpaper information'));
            info_item.connect('activate', () => {
                Main.notify(_('Wow, such empty...'));
            });

            let next_item = new PopupMenu.PopupMenuItem(_('Next Wallpaper'));
            next_item.connect('activate', () => {
                Main.notify(_('Not yet implemented...'));
            });

            this.menu.addMenuItem(info_item);
            this.menu.addMenuItem(next_item);
        }
    }
);

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
