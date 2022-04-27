var folders = [];
var files = [];

function displayFileTree() {
    fetch("https://api.github.com/repos/felix-khlmnn/library/git/trees/master?recursive=1") // API endpoint that returns the file tree
        .then(res => res.json())
        .then(output => output.tree)
        .then(tree => {
            for (let i = 0; i < tree.length; i++) { // filling the arrays with folders and files
                const element = tree[i];
                console.log(element)
                if(element.type == "tree") { //folders
                    folders.push({path: element.path, url: element.url});
                } else if (element.type == "blob" && element.path != ".gitignore") {// gitignore shouldn't be part of the files array 
                    files.push({path: element.path, url: element.url});
                }
            }
            console.log(folders)
            console.log(files)
            var treeHolder = document.getElementById("tree-holder");

            // putting the arrays into the html
            for (let i = 0; i < folders.length; i++) {
                const folder = folders[i];
                console.log(`Inserting ${folder.path}`)
                treeHolder.innerHTML += `<li>${folder.path}</li>`;
                for (let j = 0; j < files.length; j++) {
                    const file = files[j];
                    console.log(j)
                    if (file.path.startsWith(folder.path)) {
                        treeHolder.innerHTML += '<ul><li><a class="tree-file" onclick="printFile(' + j + ')">' + file.path.replace(folder.path + "/", "") + '</a></li><ul>';
                    }
                }
            }
        })
        /*.then(firstURL => fetch(firstURL)
            .then(res => res.json())
            .then(output => console.log(atob(output.content))));*/
}

function printFile(filenum) { // innerHTML doesn't guarantee correct preservation of the text, so I use indices instead
    var textHolder = document.getElementById("text-holder");
    
    let assignedPath = files[filenum].path; // Use the provided index to find the path
    let uriPath = encodeURI(assignedPath); // Make the path URI-conform
    urlToFile = "https://raw.githubusercontent.com/felix-khlmnn/library/master/" + uriPath; // compile the link to the raw GitHub user content

    fetch(urlToFile)
        .then(res => res.text())
        .then(data => {
            textHolder.innerHTML = data.replaceAll("<", "&lt;").replaceAll(">", "&gt;"); // The replaceAll functions stop an accidental creation of html tags
        })
}