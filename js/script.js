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
    var locationPage = document.URL.split("/")[document.URL.split("/").length -1].split(".")[0];
    console.log(locationPage);

    var imageDirectory = "images/";
    var linkDirectory = "work/";
    var workNum;
    var full;

    switch (locationPage) {
        case "index" : // need to decide whether this page will actually end in index.html
            break;
        case "" : // this handles ending not in .html such as /portfolio
            break;
        case "work" :
            full = true;
            break;
        case "connect" :
            break;
        default:
            imageDirectory = "../images/";
            linkDirectory = "";
            for (var i = 0; i < Object.keys(workLibrary["gallery"]).length; i++) {
                if (locationPage == workLibrary["gallery"][i]) {
                    workNum = i;
                    break;
                }
            }
            loadContent(imageDirectory, workNum);
            break;
    }
    loadGallery(imageDirectory, linkDirectory, workNum, full);
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

//     var processDiv = document.getElementById("processText");
//     var processImg = document.getElementById("processImg");
//     processDiv.innerHTML = workLibrary[workLibrary["gallery"][workNum]]["understand"];
//     processImg.src = fullImageDirectory + workLibrary[workLibrary["gallery"][workNum]]["understandImg"];
//     processImg.alt = workLibrary[workLibrary["gallery"][workNum]]["understandImgAlt"];
    processTab(0);
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

    var currentPage = document.URL.split("/")[document.URL.split("/").length -1].split(".")[0];
    var fullImageDirectory = "../images/" + currentPage + "/";
    switch (nextTab) {
        case 0:
            var processLibrary = workLibrary[currentPage]["understand"];
            break;
        case 1:
            var processLibrary = workLibrary[currentPage]["experiment"];
            break;
        case 2:
            var processLibrary = workLibrary[currentPage]["implement"];
            break;
    }
    var processExpand = document.getElementById("processExpand");
    processExpand.innerHTML = "";
    for (var i = 0; i < Object.keys(processLibrary).length; i++) {
        var processTextDiv = document.createElement("div");
        processTextDiv.innerHTML = processLibrary[i]["txt"];
        processTextDiv.classList.add("processText");
        var processArtifactDiv = document.createElement("div");
        processArtifactDiv.classList.add("processArtifact");
        processArtifactDiv.onclick = function() {
            showOverlay(this);
        };
        var processImg = document.createElement("img");
        processImg.src = fullImageDirectory + processLibrary[i]["img"];
        processImg.alt = processLibrary[i]["alt"];
        processImg.classList.add("processImg");
        processArtifactDiv.appendChild(processImg);
        var processRow = document.createElement("div");
        processRow.classList.add("processRow");
        processRow.appendChild(processTextDiv);
        processRow.appendChild(processArtifactDiv);
        processExpand.appendChild(processRow);
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
    "arassistant": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "ceder": {
        "title": "CEDER Website Re-Design Consulting",
        "tags": "client consulting, ",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "cofund": {
        "title": "CoFund - ",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "districtsix": {
        "title": "Cape Town District Six Pre-Apartheid Community Memory Mapping",
        "tags": "interaction development, UX design, information architecture, technology implementation, GIS",
        "subtitle": "The District Six Museum in Cape Town, South Africa wanted to publish an interactive online map capturing life in the District Six community prior to the racially segregating apartheid system of the mid-to-late 1900s when its residents were forcibly removed and the buildings were demolished. We interviewed seven former residents, identified community landmarks within the museum archives, and incorporated street address data to design, develop, and implement this map on the museum’s website: <a href='https://districtsix.co.za/project/st-marks-memory-mapping-project' target='_blank'>districtsix.co.za/project/st-marks-memory-mapping-project</a>. The map alone can be explored by clicking the image to the right.<br><br>This project won Honorable Mention at the 2019 Innovation and Appropriate Technology in Africa Conference as well as Faculty Choice at the 2020 UMSI Spring Exposition.",
        "artifact": "preview.png",
        "artifactAlt": "Interactive map screenshot",
        "understand": {
            0: {
                "txt": "Through <span class='keyword'>stakeholder conversations</span> with the museum administration, we gained a clear understanding of the project goal being an interactive map embedded on the museum’s public website that presented the pre-apartheid history of the District Six community. The museum staff stressed to us the importance of apartheid history to South Africans, especially since there were still many living survivors. Maps from the era were particularly treasured because they served as proof of the thriving communities beforehand and the barren lots after, which is why they believed that adding a map to the museum website could serve as a mark of identity as well as an educational resource. What was left open for our team to determine was the specific content that map would contain, how the map would be integrated into the museum’s website, and how a website visitor would explore and interact with the map.",
                "img": "thumbnail.png",
                "alt": "temp alt text understand1",
            },
            1: {
                "txt": "The <span class='keyword'>design objectives</span> that our team was able to define for the map based on our initial discussions were: <ul><li>accessible: public visitors to the museum website should be able to view the map without obstacles such as account credentials or data fees</li><li>economical: museum should not incur any additional costs to host the map on their website</li><li>customizable: map must integrate and display the disparate sources and types of data with desired user interactions</li><li>sustainable: solution should not exceed the museum staff’s technological understanding so that they can be capable of maintaining it</li></ul>",
                "img": "thumbnail.png",
                "alt": "temp alt text understand2",
            },
            2: {
                "txt": "We conducted a <span class='keyword'>comparator analysis</span> by researching other existing maps to gather insight on graphical layouts, information architecture, interactive features, and GIS implementation methods. A map of District Six printed in the museum’s recently published historical cookbook that highlighted some community landmarks served as a good starting point. The <a href='https://projects.lib.wayne.edu/12thstreetdetroit/exhibits/show/july23_aug41967/map' target='_blank'>Detroit 67 Project</a> was built with the Neatline plugin for Omeka CMS, plotting clickable points of interest onto a baselayer of Google Maps or OpenStreetMaps, but this implementation approach did not meet the need for historical accuracy because the baselayer would display current-day streets and buildings while the points of interest would be from a past era where the geography was different. <a href='https://arcg.is/ubmm9' target='_blank'>The St. Louis LGBTQ Map</a> used ArcGIS to produce maps very smoothly integrated into the entire webpage, but this implementation approach would likely entail subscription fees to the hosting service.",
                "img": "thumbnail.png",
                "alt": "temp alt text understand3",
            },
        },
        "experiment": {
            0: {
                "txt": "Multiple <span class='keyword'>sketching</span> sessions were held to generate ideas for the map layout, content structure, and interactive features. Having a variety of concepts allowed us to discuss the benefits of different design features and combine ideas that might work well together.",
                "img": "sketchdesktop3.jpg",
                "alt": "temp alt text experiment0",
            },
            1: {
                "txt": "<span class='keyword'>Digital prototypes</span> were created prior to meeting again with the museum administration, and their approval set these as an initial design direction to begin building. The prototype of the desktop version of the map was a multipage PDF with mouse click interactions simulated by hyperlinks to different pages, built using Adobe Illustrator. The prototype of the mobile version was built using Figma.",
                "img": "digitalprototypedesktop.png",
                "alt": "desktop: pdf file; mobile: https://www.figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe?node-id=17%3A46&scaling=scale-down&redirected=1",
            },
        },
        "implement": {
            0: {
                "txt": "Particular <span class='keyword'>interaction features</span> were programmed to support exploration of the large quantity of content contained within the map:<ul><li>togglable layers allowed focusing on particular content such as individual resident’s stories or groups of community landmarks by graphically highlighting the selected layer’s points of interest and gently fading the rest</li><li>image slideshows enabled scrolling through photos taken over the course of each resident’s life without overcrowding the screen</li><li>an image overlay would cover the screen upon clicking any individual image, making the historical photos larger for better viewing as well as displaying accompanying textual descriptions about their significance</li><li>audio players lent an additional dimension of immersion through recordings of residents discussing life in District Six in their own voices</li></ul>",
                "img": "thumbnail.png",
                "alt": "temp alt text implement0",
            },
            1: {
                "txt": "We built a lengthy <span class='keyword'>implementation process</span> to integrate the disparate pieces produced by the different members of the team. District Six community landmark data collected from the museum archives as well as data points of former residents’ life stories gathered from interviews organized in Excel spreadsheets and historical building footprints outlined in Illustrator were imported into open source QGIS mapping software where they were geolocated and assigned to corresponding map layers. From QGIS, the qgis2web plugin exported that compiled map to a HTML, CSS, and JavaScript web code representation on top of which additional features were developed including toggleable layers and embedding historical photos and audio recordings. This fully developed code was uploaded to a newly created GitHub repository in the museum’s name, and to have the interactive map rendered online we inserted an iframe element linking to the GitHub-hosted code on a dedicated webpage on the museum’s WordPress website.",
                "img": "thumbnail.png",
                "alt": "temp alt text implement1",
            },
            2: {
                "txt": "At the close of the project, we included <span class='keyword'>sustainability recommendations</span> in our deliverables submitted to the museum administration. In addition to describing further work that could be undertaken to enhance the interactive map such as evaluating visitor navigation as well as implementing the mobile version that was determined to be beyond scope with our timeline, we included a conceptual breakdown of domain knowledge and technological capabilities that the museum should consider bringing into their staff to be able to continue to engage in these types of digital scholarship projects going forward.",
                "img": "thumbnail.png",
                "alt": "temp alt text implement2",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "murphybed": {
        "title": "Fold-Down Murphy Bedframe ",
        "tags": "product design, ergonomic analysis, manufacturing, cost optimization",
        "subtitle": "murphybed",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.jpg",
        "extra": "",
    },
    "recycleannarbor": {
        "title": "Recycle Ann Arbor Database and Process Consulting",
        "tags": "client consulting, industry benchmarking, qualitative data collection and synthesis",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "skim": {
        "title": "SKIM Ann Arbor Local News Publication Service Design",
        "tags": "service design, design evaluation, behavioral research, quantitative data analysis",
        "subtitle": "Low voter turnout among young adults in local elections motivated our team to explore the factors contributing to low civic engagement (political participation, volunteering, serving the community, social action, and actively seeking information about civic issues), and learned that university students in particular face unique challenges to becoming engaged with the broader local community. To address this issue, we designed a new production and distribution service that involved students in the production process and provided digestible and actionable news content. Design evaluation user testing suggested that such a service might be able to contribute towards increasing university student civic engagement.",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "",
        "extra": "",
    },
    "veggiefresh": {
        "title": "VeggieFresh Consumer Food Storage Product Design",
        "tags": "product design, market research, quantitative data analysis, design engineering, business planning",
        "subtitle": "Each year in the United States, 21% of the total food supply is lost at the individual consumer level - about 90 billion pounds of waste costing $450 per person. To address this issue, we researched the existing market of food storage products to identify design opportunities, defined design objectives based on consumer pain points, brainstormed a diversity of potential ideas, prototyped and optimized one design that best fit the design objectives, and outlined a business plan for manufacturing, distribution, and sale. Our final design was VeggieFresh: an in-fridge, container storage vacuum preservation system that improves shelf life and visibility of stored food.",
        "artifact": "prototype.jpg",
        "artifactAlt": "Physical prototype manufactured to demonstrate the form and function of the final designed consumer product",
        "understand": {
            0: {
                "txt": "interviews and surveys",
                "img": "model.png",
                "alt": "replace maybe with market positioning",
            },
            1: {
                "txt": "Market positioning and opportunities",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "Problem statement, Design attributes and constraints",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "Functional decomposition",
                "img": "cad.gif",
                "alt": "replace maybe with scanned draft ideas or maybe pugh chart",
            },
            1: {
                "txt": "Brainstorm",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "Pugh chart",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "Kansei analysis",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "3D modeling for establishing final product appearance",
                "img": "cad2.gif",
                "alt": "animation of intended product usage",
            },
            1: {
                "txt": "Physical prototyping for evaluating use case and value proposition",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "Manufacturing plan",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "Business plan",
                "img": "",
                "alt": "",
            },
            4: {
                "txt": "Lifecycle analysis",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.jpg",
        "extra": "",
    },
    "youngread": {
        "title": "YoungRead - ",
        "tags": "design methodology",
        "subtitle": "This project won 3rd prize at the 2020 James A. Kelly Learning Levers competition as well as the Zell Lurie Institute Innovation and Entrepreneurship Award at the 2020 UMSI Spring Exposition.",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "template": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "understand": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "implement": {
            0: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "http://www.placehold.it/200x200",
        "extra": "",
    },
}
