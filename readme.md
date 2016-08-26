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
| name        | name         |
| version     | version      |
| description | description  |
| createdby   | author.name  |
| webaddress  | author.url   |

> Note: If the workflow is prefixed by `alfred-`, that prefix is being removed in the name of `info.plist`. For example, `alfred-unicorn` becomes `unicorn`.


## Related

- [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
