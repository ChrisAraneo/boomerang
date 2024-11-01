# Boomerang

![Boomerangs](logo.png)

Boomerang is a simple Node.js utility script that can be used to test the reachability of a host.
It's similar to `ping` but the main feature is playing sound when host returns successful response after previously being unavailable.

While developing projects I am often dealing with long build and reload times that can take several minutes. I created this script to monitor when the build process is complete. When the UI app is ready, the script plays a sound, allowing me to focus on other tasks and return to work once the project is ready.

# Prerequisites

Install [Node.js] which includes [Node Package Manager][npm].
After installation you should be able to run the command `npm --version` without errors:

```bash
npm --version
10.8.2
```

# Running on Windows or Mac

```bash
npm install
```

```bash
npm run start --url http://localhost:8080/ --d 5000
```

# Running on Linux

Boomerang uses the `play` command under the hood to play sounds on Linux.
To use this script on Linux without errors you need to have working `play` command that can play mp3 files.

For example on Ubuntu you can get `sox` & `libsox-fmt-mp3`:

```bash
sudo apt install sox
```

```bash
sudo apt install libsox-fmt-mp3
```

([https://askubuntu.com/a/920542](https://askubuntu.com/a/920542))

Once installed, you should be able to use the script without any issues.

## License

Project is [MIT licensed](LICENSE).

Boomerang photo is [licensed under CC BY 2.0 Deed by Peter Harlow](https://creativecommons.org/licenses/by/2.0/).
Photo author: [Peter Harlow](https://www.flickr.com/photos/one-world-is-enough/).
Photo source: [https://www.flickr.com/photos/139843207@N05/26775242217](https://www.flickr.com/photos/139843207@N05/26775242217).