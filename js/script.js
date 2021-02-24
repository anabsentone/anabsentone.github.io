function linkWork(workNum) {
    var workID;
}

function showOverlay(option) {
    document.getElementById("imageOverlay").classList.remove("overlayOff");
    switch(option) {
        case "background":
            document.getElementById("overlayImg").src = "";
            document.getElementById("overlayImg").alt = "Adidas Gazelles";
            document.getElementById("overlayText").innerHTML = "Adidas Gazelles";
            break;
        case "districtsix":
            document.getElementById("overlayImage").removeChild(document.getElementById("overlayImg"));
            document.getElementById("overlayImage").innerHTML = '<iframe src="https://districtsixmuseum.github.io/memorymappingproject"></iframe>';
            document.getElementById("overlayText").innerHTML = 'something something about this map you know blah blah';
            break;
        default:
            console.log(option);
            document.getElementById("overlayImg").src = option.children[0].src;
            document.getElementById("overlayImg").alt = option.children[0].alt;
            document.getElementById("overlayText").innerHTML = option.children[0].alt;
            break;
    }
}

function closeOverlay() {
    document.getElementById("imageOverlay").classList.add("overlayOff");
    document.getElementById("overlayImage").innerHTML = '<img id="overlayImg" src="">';
    document.getElementById("overlayText").innerHTML = '';
}

function loadPage() {
    var locationArray = window.location.href.split("/");
    var locationPage = locationArray[locationArray.length - 1];

    var imageDirectory = "images/";
    var linkDirectory = "work/";
    var workNum;
    var full;

    switch (locationPage) {
        case "index.html" :
            loadGallery(imageDirectory, linkDirectory, workNum, full);
            break;
        case "work.html" :
            full = true;
            loadGallery(imageDirectory, linkDirectory, workNum, full);
            break;
        case "connect.html" :
            loadGallery(imageDirectory, linkDirectory, workNum, full);
            break;
        default:
            imageDirectory = "../images/";
            linkDirectory = "";
            for (var i = 0; i < Object.keys(workLibrary["gallery"]).length; i++) {
                if (locationPage.split(".")[0] == workLibrary["gallery"][i]) {
                    workNum = i;
                    break;
                }
            }
            loadContent(imageDirectory, workNum);
            loadGallery(imageDirectory, linkDirectory, workNum, full);
            break;
    }
}

function loadContent(imageDirectory, workNum) {
    var fullImageDirectory = imageDirectory + workLibrary["gallery"][workNum] + "/";

    var titleDiv = document.getElementById("descriptionTitle");
    var tagsDiv = document.getElementById("descriptionTags");
    var subtitleDiv = document.getElementById("descriptionSubtitle");
    var artifactImg = document.getElementById("artifactImage");
    titleDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["title"];
    tagsDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["tags"];
    subtitleDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["subtitle"];
    artifactImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["artifact"];
    artifactImg.alt = workLibrary[workLibrary["gallery"][workNum]]["artifactAlt"];

    // var understandDiv = document.getElementById("understandText");
    // var understandImg = document.getElementById("understandImg");
    // var experimentDiv = document.getElementById("experimentText");
    // var experimentImg = document.getElementById("experimentImg");
    // var implementDiv = document.getElementById("implementText");
    // var implementImg = document.getElementById("implementImg");
    // understandDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["understand"];
    // understandImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["understandImg"];
    // understandImg.alt = workLibrary[workLibrary["gallery"][workNum]]["understandImgAlt"];
    // experimentDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["experiment"];
    // experimentImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["experimentImg"];
    // experimentImg.alt = workLibrary[workLibrary["gallery"][workNum]]["experimentImgAlt"];
    // implementDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["implement"];
    // implementImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["implementImg"];
    // implementImg.alt = workLibrary[workLibrary["gallery"][workNum]]["implementImgAlt"];

    var processDiv = document.getElementById("processText");
    var processImg = document.getElementById("processImg");
    processDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["understand"];
    processImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["understandImg"];
    processImg.alt = workLibrary[workLibrary["gallery"][workNum]]["understandImgAlt"];
}

function hoverInteractive() {
    var interactiveCoverDiv = document.getElementById("interactiveCover");
    interactiveCoverDiv.style.visibility = "visible";
    interactiveCoverDiv.style.color = "rgba(100,100,100,1)";
    interactiveCoverDiv.classList.add("interactiveCoverHover");
}

function departInteractive() {
    var interactiveCoverDiv = document.getElementById("interactiveCover");
    interactiveCoverDiv.style.visibility = "hidden";
    interactiveCoverDiv.style.color = "rgba(100,100,100,0)";
    interactiveCoverDiv.classList.remove("interactiveCoverHover");
}

function processTab(nextTab) {
    // var processDiv = document.getElementById("process");
    // var processNav = processDiv.children[0];
    var processNav = document.getElementById("process").children[0];
    for (var i = 0; i < processNav.children.length; i++) {
        if (processNav.children[i].classList.contains("activeTab")) {
            processNav.children[i].classList.remove("activeTab");
            // processDiv.children[i + 1].classList.remove("activeExpand");
            break;
        }
    }
    processNav.children[nextTab].classList.add("activeTab");
    // processDiv.children[nextTab + 1].classList.add("activeExpand");

    var processDiv = document.getElementById("processText");
    var processImg = document.getElementById("processImg");

    var workNum = 1;
    fullImageDirectory = "../images/veggiefresh/";
    switch (nextTab) {
        case 0:
            processDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["understand"];
            processImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["understandImg"];
            processImg.alt = workLibrary[workLibrary["gallery"][workNum]]["understandImgAlt"];
            break;
        case 1:
            processDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["experiment"];
            processImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["experimentImg"];
            processImg.alt = workLibrary[workLibrary["gallery"][workNum]]["experimentImgAlt"];
            break;
        case 2:
            processDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["implement"];
            processImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["implementImg"];
            processImg.alt = workLibrary[workLibrary["gallery"][workNum]]["implementImgAlt"];
            break;
    }
}

function loadGallery(imageDirectory, linkDirectory, workNum, full) {
    var galleryDiv = document.getElementById("gallery");

    for (i = 0; i < 7; i++) {
        galleryDiv.children[i].children[0].children[0].children[1].src = imageDirectory + workLibrary["gallery"][i] + "/" + workLibrary[workLibrary["gallery"][i]]["thumbnail"];
        galleryDiv.children[i].href = linkDirectory + workLibrary["gallery"][i] + ".html";
    }

    if (typeof workNum === 'number') {
        var currentGallery = galleryDiv.children[workNum].innerHTML;
        galleryDiv.children[workNum].href = "";
        galleryDiv.children[workNum].children[0].classList.add("imageCurrent");

        galleryDiv.children[7].children[0].children[0].children[1].src = "../images/etc.png";
        galleryDiv.children[7].href = "../work.html";
    }
    else {
        galleryDiv.children[7].children[0].children[0].children[1].src = "images/etc.png";
        galleryDiv.children[7].href = "work.html";
    }
}

function hoverWork(workNum) {
    var workID = "work" + workNum;
    var workDiv = document.getElementById(workID);
    workDiv.classList.add("imageCenterHover");
    workDiv.children[0].children[0].classList.add("imageCoverHover");
}

function departWork(workNum) {
    var workID = "work" + workNum;
    var workDiv = document.getElementById(workID);
    workDiv.classList.remove("imageCenterHover");
    workDiv.children[0].children[0].classList.remove("imageCoverHover");
}

var workLibrary = {
    "gallery": {
        0: "districtsix",
        1: "veggiefresh",
        2: "youngread",
        3: "ceder",
        4: "murphybed",
        5: "recycleannarbor",
        6: "cofund",
        7: "",

    },
    "districtsix": {
        "title": "Cape Town District Six Pre-Apartheid Community Memory Mapping",
        "tags": "interaction development, UX design, information architecture, GIS",
        "subtitle": "The District Six Museum in Cape Town, South Africa wanted to publish an interactive online map capturing life in the District Six community prior to the racially segregating apartheid system of the mid-to-late 1900s when its residents were forcibly removed and the buildings were demolished. We interviewed seven former residents, identified community landmarks within the museum archives, and leveraged previously gathered street address data to design, develop, and implement on the museum’s website: <a href='https://bit.ly/districtsixmapping' target='_blank'>bit.ly/districtsixmapping</a> or the map alone can be explored by clicking the image to the right.<br><br>This project won Honorable Mention at the 2019 Innovation and Appropriate Technology in Africa Conference as well as Faculty Choice at the 2020 UMSI Spring Exposition.",
        "artifact": "preview.png",
        "artifactAlt": "Interactive map screenshot",
        "understand": "We our final implementation needed to meet the requirements of customization, accessbility, sustainability, and afforability. filler text here will be replaced in future ya know filler text filler text here will be replaced in future ya know filler text here will be replaced in future ya know filler text here will be replaced in future ya know filler text here will be replaced in future ya know ",
        "understandImg": "cntravelerdistrictsixmuseum.jpg",
        "understandImgAlt": "alt text cn traveler",
        "experiment": "We drafted many versions of map interfaces to come to consensus on the map layout and interactive features to best capture and present the former residents' stories and historical data. We explored multiple potential methods for publishing the map on the web such as Google Maps, ArcGis, WordPress map plugins, through which we were able to conclude that ",
        "experimentImg": "",
        "experimentImgAlt": "",
        "implement": "We were able to develop an implementation process of the archival researcher who gathered information and images to pass to the architect who embedded them with geographical data into QGIS to export to the interaction developer (me) who built interactive features using HTML CSS JavaScript. The final code was uploaded to GitHub, and the intended webpage on the museum's WordPress website links to that source to display the interactive map.",
        "implementImg": "",
        "implementImgAlt": "",
        "thumbnail": "thumbnail.png",
        "extra": ""
    },
    "veggiefresh": {
        "title": "VeggieFresh - Vacuum Food Storage Container System",
        "tags": "product design, engineering optimization, market research, business planning",
        "subtitle": "VeggieFresh is a vacumm container that seals within the refrigerator, combining the food preservation qualities of vacuum-sealing and refrigeration with the convenience and reduced waste of reusable storage containers.<br><br>blah blah frica wanted to publish an interative online map capturing life in the District Six community prior to the apartheid system of the mid-to-late 1900s when its residents were forcibly removed and buildings were demolished. We interviewed seven Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        "artifact": "prototype.jpg",
        "artifactAlt": "Physical prototype manufactured to demonstrate the form and function of the final designed consumer product",
        "understand": "veggiefresh understand text goes here discussing wicked problem and market research and how to informed design goals and attributes",
        "understandImg": "model.png",
        "understandImgAlt": "replace maybe with market positioning",
        "experiment": "veggiefresh experiment description of various ideas brainstormed by the team and how we got to final",
        "experimentImg": "cad.gif",
        "experimentImgAlt": "replace maybe with scanned draft ideas or maybe pugh chart",
        "implement": "veggiefresh implement present ",
        "implementImg": "cad2.gif",
        "implementImgAlt": "animation of intended product usage",
        "thumbnail": "thumbnail.jpg",
        "extra": ""
    },
    "murphybed": {
        "title": "Fold-Down Murphy Bedframe ",
        "tags": "product design, ergonomic analysis, manufacturing, cost optimization",
        "subtitle": "murphybed",
        "artifact": "",
        "understand": "murphybed understand",
        "understandImg": "",
        "experiment": "murphybed experiment",
        "experimentImg": "",
        "implement": "murphybed implement",
        "implementImg": "",
        "thumbnail": "thumbnail.jpg"
    },
    "recycleannarbor": {
        "title": "Recycle Ann Arbor Database and Process Consulting",
        "tags": "client consulting, industry benchmarking, qualitative data collection and synthesis",
        "subtitle": "",
        "artifact": "",
        "understand": "",
        "understandImg": "",
        "experiment": "",
        "experimentImg": "",
        "implement": "",
        "implementImg": "",
        "thumbnail": "thumbnail.png"
    },
    "youngread": {
        "title": "YoungRead - ",
        "tags": "design methodology",
        "subtitle": "This project won 3rd prize at the 2020 James A. Kelly Learning Levers competition as well as the Zell Lurie Institute Innovation and Entrepreneurship Award at the 2020 UMSI Spring Exposition.",
        "artifact": "",
        "understand": "",
        "understandImg": "",
        "experiment": "",
        "experimentImg": "",
        "implement": "",
        "implementImg": "",
        "thumbnail": "thumbnail.png"
    },
    "cofund": {
        "title": "CoFund - ",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "understand": "",
        "understandImg": "",
        "experiment": "",
        "experimentImg": "",
        "implement": "",
        "implementImg": "",
        "thumbnail": "thumbnail.png"
    },
    "ceder": {
        "title": "CEDER Website Re-Design Consulting",
        "tags": "client consulting, ",
        "subtitle": "",
        "artifact": "",
        "understand": "",
        "understandImg": "",
        "experiment": "",
        "experimentImg": "",
        "implement": "",
        "implementImg": "",
        "thumbnail": "thumbnail.png"
    },
    "arassistant": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "understand": "",
        "understandImg": "",
        "experiment": "",
        "experimentImg": "",
        "implement": "",
        "implementImg": "",
        "thumbnail": "thumbnail.png"
    },
    "template": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "understand": "",
        "understandImg": "",
        "experiment": "",
        "experimentImg": "",
        "implement": "",
        "implementImg": "",
        "thumbnail": "http://www.placehold.it/200x200"
    }
}