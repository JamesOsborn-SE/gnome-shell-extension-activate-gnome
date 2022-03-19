const Gio = imports.gi.Gio
const Gtk = imports.gi.Gtk

const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()

function init() {
}

function buildPrefsWidget() {
    this.settings = ExtensionUtils.getSettings(Me.metadata['settings-schema'])

    let prefsWidget = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        halign: Gtk.Align.CENTER,
        spacing: 6,
        margin_top: 12,
        margin_bottom: 12,
        margin_start: 6,
        margin_end: 6,
    })

    // line 1
    let l1label = new Gtk.Label({
        label: '<b>Line 1</b>',
        margin_top: 6,
        use_markup: true,
    })
    prefsWidget.append(l1label)

    let l1entry = new Gtk.Entry({
        margin_top: 6,
        hexpand: true,
    })
    l1entry.set_width_chars(30)
    prefsWidget.append(l1entry)

    // line 2
    let l2label = new Gtk.Label({
        label: '<b>Line 2</b>',
        margin_top: 6,
        use_markup: true,
    })
    prefsWidget.append(l2label)

    let l2entry = new Gtk.Entry({
        margin_top: 6,
        hexpand: true,
    })
    l2entry.set_width_chars(30)
    prefsWidget.append(l2entry)

    // l2-vertical
    let vlabel = new Gtk.Label({
        label: '<b>Vertical Position</b>',
        margin_top: 12,
        use_markup: true,
    })
    prefsWidget.append(vlabel)

    let ventry = new Gtk.SpinButton({
        adjustment: new Gtk.Adjustment({lower: 0.01, upper: 1.0, step_increment: 0.01, page_increment: 0.1}),
        margin_top: 6,
        numeric: true,
        digits: 4,
    })
    prefsWidget.append(ventry)

    // l2-horizontal
    let hlabel = new Gtk.Label({
        label: '<b>Horizontal Position</b>',
        margin_top: 6,
        use_markup: true,
    })
    prefsWidget.append(hlabel)

    let hentry = new Gtk.SpinButton({
        adjustment: new Gtk.Adjustment({lower: 0.01, upper: 1.0, step_increment: 0.01, page_increment: 0.1}),
        margin_top: 6,
        numeric: true,
        digits: 4,
    })
    prefsWidget.append(hentry)

    // opacity
    let olabel = new Gtk.Label({
        label: '<b>Opacity</b>',
        margin_top: 6,
        use_markup: true,
    })
    prefsWidget.append(olabel)

    let oentry = new Gtk.Scale({
        adjustment: new Gtk.Adjustment({lower: 0.1, upper: 255, step_increment: 0.1, page_increment: 1}),
        margin_top: 6,
        draw_value: false,
        digits: 1,
    })
    prefsWidget.append(oentry)

    let resetbtn = new Gtk.Button({
        label: 'reset',
        margin_top: 12,
        margin_bottom: 6,
    })
    resetbtn.connect('clicked', () => {
        this.settings.reset('text-l1')
        this.settings.reset('text-l2')
        this.settings.reset('l2-vertical')
        this.settings.reset('l2-horizontal')
        this.settings.reset('opacity')
    })
    prefsWidget.append(resetbtn)

    this.settings.bind('text-l1', l1entry, 'text', Gio.SettingsBindFlags.DEFAULT)
    this.settings.bind('text-l2', l2entry, 'text', Gio.SettingsBindFlags.DEFAULT)
    this.settings.bind('l2-vertical', ventry.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT)
    this.settings.bind('l2-horizontal', hentry.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT)
    this.settings.bind('opacity', oentry.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT)

    return prefsWidget
}
