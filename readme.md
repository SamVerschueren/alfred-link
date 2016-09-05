# alfred-link [![Build Status](https://travis-ci.org/SamVerschueren/alfred-link.svg?branch=master)](https://travis-ci.org/SamVerschueren/alfred-link)

> Make your [Alfred](https://www.alfredapp.com/) workflows installable from npm


## Install

```
$ npm install --save alfred-link
```


## Usage

Add the `alfred-link` command as `postinstall` script of your Alfred package.

```json
{
  "name": "alfred-unicorn",
  "scripts": {
    "postinstall": "alfred-link"
  }
}
```

You can now install the `alfred-unicorn` package like this

```
$ npm install -g alfred-unicorn.
```

This will update `info.plist` with the information from `package.json` and creates a `unicorn` symlink inside the Alfred workflows directory that points to the location of the `alfred-unicorn` module.


## info.plist

This package will update the `info.plist` file when the workflow is being installed. The following properties in `info.plist` can be safely omitted. The corresponding values in `package.json` are added to the plist file.

| info.plist  | package.json |
|-------------|--------------|
| version     | version      |
| description | description  |
| webaddress  | homepage     |
| createdby   | author.name  |


## Development

When developing an Alfred workflow, you can call `alfred-link` directly from your cli. Either by installing `alfred-link` globally or by calling `alfred-link` from your `node_modules/.bin` directory. This will create a symlink in the Alfred workflows directory pointing to your development location without transforming `info.plist`.

```
$ ./node_modules/.bin/alfred-link
```


## Related

- [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
