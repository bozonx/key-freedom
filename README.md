# key-freedom
Smart key bindings for Linux

## Start

Start with config places in `~/.config/key-freedom/config.yaml`

    node ~/.local/share/key-freedom/key-freedom.js

Specify config

    node ~/.local/share/key-freedom/key-freedom.js -c ~/mySuperConfig.yaml

## Prepare your system

Install `xcape`

## Install at startup

Make scrips `replace-keyboard.sh`

    #!/usr/bin/env bash
    xkbcomp $HOME/.config/xkb/my $DISPLAY
    xmodmap -e "keycode any = space"
    xcape  -t 200 -e "ISO_Level5_Shift=space"
    node ~/.local/share/key-freedom/key-freedom.js

After that add it as login script to your system config

## Build

    yarn build

After that look up `./build` dir

## Debug

    yarn start --debug -c ./src/testConfig.yaml

## Fast restart xkbcomp, xmodmap, xcape

    killall -9 xcape; xkbcomp $HOME/.config/xkb/my $DISPLAY && xmodmap -e "keycode any = space" && xcape -t 200 -e "ISO_Level3_Shift=space"
