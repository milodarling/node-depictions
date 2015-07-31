# Node Depictions
A depiction system written in Node.js and Jade.

See it in action [here](http://hunnin.odin.me/depictions/com.elijahandandrew.reachapp/).

This will create pretty depictions for your projects, complete with a short description, full description, changelog, feature list, known bugs, and more.

Design thanks to [xTheMaster3x](https://github.com/xTheMaster3x) and [aabosh](https://github.com/aabosh).
Modified by [Hœenir](https://github.com/hoenir_)

In order to add a depiction, simply add a folder with your package's identifier, containing an Info.json file and an optional `screenshots` folder, into `public/depictions/data/`. The layout should look like this:

```
node-depictions
├───index.js
├───...
└───public
    ├───data
    │   ├───com.your.package
    │   │   ├───Info.json
    │   │   ├───screenshots
    │   │   │   ├───screen1.png
    │   │   │   ├───screen2.jpg
    │   │   │   ├───tweakinaction.gif
```

**The URL for your depiction will then be http://example.com/depictions/com.your.package/**

###Info.json
Your Info.json file can contain the following keys:

| Key | Type | Description | Required |
| ------ | ------ | ------ | ------ |
|  `title`  |  String  |   The title of your package  | Yes |
|  `shortdescription`  |  String  |   A short description of your package (like the one in the control file). Can contain HTML tags | No |
|  `fulldescription`  |  String  |   The full description of the package. Can contain HTML tags | Yes |
| `compatibility` | Dictionary (two keys: `minimum` and `maximum`) | The iOS versions with which your package is compatible | No |
| `changes` | Array (see below) | The changelog for your package | No |
| `features` | Array of strings | A list of features for your package. HTML tags supported | No |
| `knownbugs` | Array of strings | A list of known bugs for your package. HTML tags supported | No |
| `email` | String | An email that users can send bug reports to | No |

###Changes
The `changes` key in your Info.json file is an array of dictionaries, where each dictionary is an entry for an update. Each entry should contain the following keys:

| Key | Type | Description |
| ------ | ------ | ------ |
|  `date`  |  String  |   The date of the update  |
| `version` | String | The version of the new update |
| `changes` | Array of strings | A list of the changes |

Note that the newer changes must be at the top of the `changes` array (i.e. `changes[0]`, or the first dictionary in the `changes` array, must be the most recent change).

###Screenshots
Screenshots should be placed in a folder called `screenshots` alongside `Info.json`

All files withing `screenshots` (except .DS_Store) will be shown as an image (currently, it does not filter out non-images, so don't put random stuff in that folder!).
