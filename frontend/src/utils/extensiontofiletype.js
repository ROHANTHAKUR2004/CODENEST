const extensiontypemap = {

    'js' : 'javascript',
    'jsx' : 'javascript',
    'html' : 'html',
    'css' : 'css',
    'ts' : 'typescript',
    'tsx' : 'typescript',
    'json' : 'json',
    'md' : 'markdown',
    'svg' : 'svg',
    'jpg' : 'jpg',
    'yml' : 'yaml',
    'yaml' : 'yaml'

}

export const extensiontofiletype = (extension) => {
     if(!extension) return undefined;
     console.log(extension);
     return extensiontypemap[extension];
}