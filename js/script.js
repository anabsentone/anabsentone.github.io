function showOverlay(option, element) {
    document.getElementById("imageOverlay").classList.remove("overlayOff");
    switch(option) {
        case "background": // currently covered by a dark translucent full page background div so not clickable
            document.getElementById("overlayImg").src = "";
            document.getElementById("overlayImg").alt = "Adidas Gazelles";
            document.getElementById("overlayText").innerHTML = "Adidas Gazelles";
            break;
        case "districtsix":
            document.getElementById("overlayImage").removeChild(document.getElementById("overlayImg"));
            document.getElementById("overlayImage").innerHTML = '<iframe src="https://districtsixmuseum.github.io/memorymappingproject"></iframe>';
            document.getElementById("overlayText").innerHTML = 'Map can be panned (mouse click and drag) and zoomed (mouse double-click or mouse scrollwheel or buttons in upper left corner). Some points do not appear until sufficiently zoomed in. Click on a storyteller&apos;s button above to highlight that individual&apos;s story. Click on a landmark button below to toggle its icons on and off. Click on a location in the map to see more details about it. Click on an image to expand it.';
            break;
        case "artifact":
            document.getElementById("overlayImg").src = element.children[0].src;
            document.getElementById("overlayImg").alt = element.children[0].alt;
            document.getElementById("overlayText").innerHTML = element.children[0].alt;
            break;
        default:
            document.getElementById("overlayImg").src = element.src;
            document.getElementById("overlayImg").alt = element.alt;
            document.getElementById("overlayText").innerHTML = element.alt;
            break;
    }
    if (element.src.includes("digitalprototypemobile")) {
        document.getElementById("overlayImage").removeChild(document.getElementById("overlayImg"));
        document.getElementById("overlayImage").innerHTML = "<iframe style='height: 70vh;' src='https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FYC8xfxRYXYLaYJarzpc6jv7F%2FDistrict-Six-Museum-Wireframe%3Fnode-id%3D17%253A46%26scaling%3Dscale-down' allowfullscreen></iframe>";
    }
}

function closeOverlay() {
    document.getElementById("imageOverlay").classList.add("overlayOff");
    document.getElementById("overlayImage").innerHTML = '<img id="overlayImg" src="">';
    document.getElementById("overlayText").innerHTML = '';
}

function loadPage() {
    var locationPage = document.URL.split("/")[document.URL.split("/").length -1].split(".")[0];

    var imageDirectory = "images/";
    var linkDirectory = "work/";
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
            loadContent(imageDirectory, locationPage);
            break;
    }
    loadGallery(imageDirectory, linkDirectory, locationPage, full);
}

function loadContent(imageDirectory, locationPage) {
    var fullImageDirectory = imageDirectory + locationPage + "/";

    var titleDiv = document.getElementById("descriptionTitle");
    var tagsDiv = document.getElementById("descriptionTags");
    var subtitleDiv = document.getElementById("descriptionSubtitle");
    var artifactImg = document.getElementById("artifactImage");
    titleDiv.innerHTML = workLibrary[locationPage]["title"];
    tagsDiv.innerHTML = workLibrary[locationPage]["tags"];
    subtitleDiv.innerHTML = workLibrary[locationPage]["subtitle"];
    artifactImg.src = fullImageDirectory + workLibrary[locationPage]["artifact"];
    artifactImg.alt = workLibrary[locationPage]["artifactAlt"];
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
            var processLibrary = workLibrary[currentPage]["examine"];
            break;
        case 1:
            var processLibrary = workLibrary[currentPage]["experiment"];
            break;
        case 2:
            var processLibrary = workLibrary[currentPage]["embed"];
            break;
    }
    var processExpand = document.getElementById("processExpand");
    processExpand.innerHTML = "";
    for (var i = 0; i < Object.keys(processLibrary).length; i++) {
        var processTextDiv = document.createElement("div");
        processTextDiv.innerHTML = processLibrary[i]["txt"];
        processTextDiv.classList.add("processText");
        var processRow = document.createElement("div");
        processRow.classList.add("processRow");
        processRow.appendChild(processTextDiv);
        if (processLibrary[i]["img"]) {
            var processArtifactDiv = document.createElement("div");
            processArtifactDiv.classList.add("processArtifact");
            if (Object.keys(processLibrary[i]["img"]).length > 1) {
                var imageLeft = document.createElement("div");
                imageLeft.innerHTML = "❮";
                imageLeft.id = "imageLeft";
                imageLeft.classList.add("imageArrow");
                imageLeft.addEventListener("click", function(e) {
                    e.stopPropagation();
                    imageChange(-1, this.parentElement.getElementsByTagName("img"));
                });
                var imageRight = document.createElement("div");
                imageRight.innerHTML = "❯";
                imageRight.id = "imageRight";
                imageRight.classList.add("imageArrow");
                imageRight.addEventListener("click", function(e) {
                    e.stopPropagation();
                    imageChange(1, this.parentElement.getElementsByTagName("img"));
                });
                processArtifactDiv.appendChild(imageLeft);
                processArtifactDiv.appendChild(imageRight);
            }
            for (var j = 0; j < Object.keys(processLibrary[i]["img"]).length; j++) {
                var processImg = document.createElement("img");
                processImg.src = fullImageDirectory + processLibrary[i]["img"][j];
                processImg.alt = processLibrary[i]["alt"][j];
                processImg.classList.add("processImg");
                processImg.addEventListener("click", function(e) {
                    showOverlay('', this);
                });
                if (j > 0) {
                    processImg.style.display = "none";
                }
                processArtifactDiv.appendChild(processImg);
            }
            processRow.appendChild(processArtifactDiv);
        }
        processExpand.appendChild(processRow);
    }
}

function imageChange(direction, imageList) {
    var currentImg;
    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].style.display != "none") {
            currentImg = i;
            imageList[i].style.display = "none";
            break;
        }
    }
    switch (currentImg + direction) {
        case -1:
            imageList[imageList.length - 1].style.display = "initial";
            break;
        case imageList.length:
            imageList[0].style.display = "initial";
            break;
        default:
            imageList[currentImg + direction].style.display = "initial";
            break;
    }
}

function loadGallery(imageDirectory, linkDirectory, locationPage, full) {
    
    if (!full) {
        var galleryDiv = document.getElementById("gallery");
        var workNum;
        var galleryLength = Object.keys(workLibrary["gallery"]).length;
        var galleryLengthPlus = galleryLength + 1;
        galleryDiv.style.grid-template-columns = "repeat(" + galleryLengthPlus + ", minmax(0, " + galleryLengthPlus + "fr))";

        for (let i = 0; i < galleryLength + 1; i++) {
            if (workLibrary["gallery"][i] == locationPage) {
                workNum = i;
            }
            var galleryItemLink = document.createElement("a");
            if (i != galleryLength) {
                galleryItemLink.href = linkDirectory + workLibrary["gallery"][i] + ".html";
            }
            else {
                if (document.URL.includes("work")) {
                    galleryItemLink.href = "../work.html";
                }
                else {
                    galleryItemLink.href = "work.html";
                }
            }
            var galleryItemDiv = document.createElement("div");
            galleryItemDiv.id = "work" + i;
            galleryItemDiv.classList.add("imageCenter");
            galleryItemDiv.addEventListener("mouseover", function () {
                hoverWork(i);
            });
            galleryItemDiv.addEventListener("mouseout", function () {
                departWork(i);
            });
            var galleryItemImageGroup = document.createElement("div");
            galleryItemImageGroup.classList.add("imageGroup");
            var galleryItemImageCover = document.createElement("div");
            galleryItemImageCover.classList.add("imageCover");
            var galleryItemImage = document.createElement("img");
            if (i != galleryLength) {
                galleryItemImage.src = imageDirectory + workLibrary["gallery"][i] + "/" + workLibrary[workLibrary["gallery"][i]]["thumbnail"];
            }
            else {
                if (document.URL.includes("work")) {
                    galleryItemImage.src = "../images/etc.png";
                }
                else {
                    galleryItemImage.src = "images/etc.png";
                }
            }
            galleryItemImageGroup.appendChild(galleryItemImageCover);
            galleryItemImageGroup.appendChild(galleryItemImage);
            galleryItemDiv.appendChild(galleryItemImageGroup);
            galleryItemLink.appendChild(galleryItemDiv);
            galleryDiv.appendChild(galleryItemLink);
//             galleryDiv.children[i].children[0].children[0].children[1].src = imageDirectory + workLibrary["gallery"][i] + "/" + workLibrary[workLibrary["gallery"][i]]["thumbnail"];
//             galleryDiv.children[i].href = linkDirectory + workLibrary["gallery"][i] + ".html";
        }

//         if (document.URL.includes("work")) {
//             if (typeof(workNum) == 'number') {
//                 var currentGallery = galleryDiv.children[workNum].innerHTML;
//                 galleryDiv.children[workNum].href = "";
//                 galleryDiv.children[workNum].children[0].classList.add("imageCurrent");
//             }
//             galleryDiv.children[galleryLength].children[0].children[0].children[1].src = "../images/etc.png";
//             galleryDiv.children[galleryLength].href = "../work.html";
//         }
//         else {
//             galleryDiv.children[galleryLength].children[0].children[0].children[1].src = "images/etc.png";
//             galleryDiv.children[galleryLength].href = "work.html";
//         }
    }
    else {
        
    }
}

function hoverWork(workItem) {
    var workID = "work" + workItem;
    var workDiv = document.getElementById(workID);
    workDiv.classList.add("imageCenterHover");
    workDiv.children[0].children[0].classList.add("imageCoverHover");
}

function departWork(workItem) {
    var workID = "work" + workItem;
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
//         5: "skim",
//         6: "cofund",
    },
    "arassistant": {
        "title": "",
        "tags": "",
        "subtitle": "",
        "artifact": "",
        "artifactAlt": "",
        "examine": {
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
        "embed": {
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
        "examine": {
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
        "embed": {
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
        "examine": {
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
        "embed": {
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
        "subtitle": "The District Six Museum in Cape Town, South Africa wanted to publish an interactive online map capturing life in the District Six community prior to the racially segregating apartheid system of the mid-to-late 1900s when its residents were forcibly removed and the buildings were demolished. Our team interviewed seven former residents, identified community landmarks within the museum archives, and incorporated street address data to design, develop, and implement this map on the museum’s website: <a href='https://districtsix.co.za/project/st-marks-memory-mapping-project' target='_blank'>districtsix.co.za/project/st-marks-memory-mapping-project</a>. The map alone can be explored by clicking the image to the right.<br><br>This project received Honorable Mention at the <a href='https://ii.umich.edu/asc/stem/conferences/stem5-tech-in-africa.html' target='_blank'>2019 Innovation and Appropriate Technology in Africa Conference</a> as well as Faculty Choice at the <a href='https://sites.google.com/umich.edu/umsistudentexposition/spring-2020-virtual-exposition' target='_blank'>2020 UMSI Spring Exposition</a>.",
        "artifact": "websiteview.png",
        "artifactAlt": "Interactive map screenshot",
        "examine": {
            0: {
                "txt": "Through <span class='keyword'>stakeholder conversations</span> with the museum administration, we gained a clear understanding of the project goal being an interactive map embedded on the museum’s public website that presented the pre-apartheid history of the District Six community. The museum staff stressed to us the importance of apartheid history to South Africans, especially since there were still many living survivors. Maps from the era were particularly treasured because they served as proof of the thriving communities beforehand and the barren lots after, which is why they believed that adding a map to the museum website could serve as a mark of identity as well as an educational resource. What was left open for our team to determine was the specific content that map would contain, how the map would be integrated into the museum’s website, and how a website visitor would explore and interact with the map.",
                "img": {
                    0: "cntravelerdistrictsixmuseum.jpg",
                    1: "quote.jpg",
                },
                "alt": {
                    0: "The District Six Museum was established in an old church building, and its main room hosts a gallery of artifacts from District Six. The centerpiece is the large floor map of District Six's streets, on which former residents have scrawled notes about the places where they lived, worked, and played.",
                    1: "This quote by a former resident of District Six captures the diversity of life within the community prior to the arrival of the apartheid policies that dismantled it. The quote was printed on an otherwise blank wall in the District Six Homecoming Centre next door to the museum that serves as an additional heritage learning center, community gathering space, and event venue.",
                },
            },
            1: {
                "txt": "The <span class='keyword'>design objectives</span> that our team was able to define for the map based on our initial discussions were: <ul><li>accessible: public visitors to the museum website should be able to view the map without obstacles such as account credentials or data fees</li><li>economical: museum should not incur any additional costs to host the map on their website</li><li>customizable: map must integrate and display the disparate sources and types of data with desired user interactions</li><li>sustainable: solution should not exceed the museum staff’s technological understanding so that they can be capable of maintaining it</li></ul>",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "We conducted a <span class='keyword'>comparator analysis</span> by researching other existing maps to gather insight on graphical layouts, information architecture, interactive features, and GIS implementation methods. A map of District Six printed in the museum’s recently published historical cookbook that highlighted some community landmarks served as a good starting point. The <a href='https://projects.lib.wayne.edu/12thstreetdetroit/exhibits/show/july23_aug41967/map' target='_blank'>Detroit 67 Project</a> was built with the Neatline plugin for Omeka CMS, plotting clickable points of interest onto a baselayer of Google Maps or OpenStreetMaps, but this implementation approach did not meet the need for historical accuracy because the baselayer would display current-day streets and buildings while the points of interest would be from a past era where the geography was different. <a href='https://arcg.is/ubmm9' target='_blank'>The St. Louis LGBTQ Map</a> used ArcGIS to produce maps very smoothly integrated into the entire webpage, but this implementation approach would likely entail subscription fees to the hosting service.",
                "img": {
                    0: "cookbook.jpg",
                    1: "arcgisproto.gif",
                },
                "alt": {
                    0: "The museum previously published a cookbook of recipes from former residents that also included a map of the community highlighting former residences and key landmarks.",
                    1: "From researching existing online interactive maps, we tried to replicate their implementation methods to understand the capabilities and limitations afforded by those systems. The test captured in these images was built on ArcGIS Online, which we concluded would not be appropriate for this project because of its subscription fees.",
                },
            },
        },
        "experiment": {
            0: {
                "txt": "Multiple <span class='keyword'>sketching</span> sessions were held to generate ideas for the map layout, content structure, and interactive features. Having a variety of concepts allowed us to discuss the benefits of different design features and combine ideas that might work well together. Sketching enabled brainstormed concepts to be explored and expanded upon, and visualizing them helped us to determine more clearly which features were promising to proceed with and which might need to be tabled.",
                "img": {
                    0: "sketchdesktop1.jpg",
                    1: "sketchdesktop2.jpg",
                    2: "sketchdesktop3.jpg",
                },
                "alt": {
                    0: "Some of my sketches showing former residents' personally significant locations on a highlighted path to represent possible paths they may have taken through the community.",
                    1: "A teammate's sketches introduced the ideas of audio players to be able to include the former residents' telling their own stories in their own voices as well as image carousels to be able to present more historical photos in less screen interface real estate.",
                    2: "A teammate's sketches initiated the general graphical layout and navigational heirarchy that were further developed.",
                },
            },
            1: {
                "txt": "<span class='keyword'>Digital prototypes</span> were created prior to meeting again with the museum administration, and their approval set these as an initial design direction to begin building. A <a href='districtsix/digitalprototypedesktop.pdf' target='_blank'>prototype of the desktop version of the map</a> was a multipage PDF built using Adobe Illustrator with mouse click interactions simulated by hyperlinks to different pages. A <a href='https://figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe?node-id=17%3A46&scaling=scale-down&redirected=1' target='_blank'>prototype of the mobile version</a> was built using Figma, an online collaborative user interface wireframming and prototyping platform.",
                "img": {
                    0: "digitalprototypedesktop.png",
                    1: "digitalprototypemobile.png",
                },
                "alt": {
                    0: "The digital prototype for the desktop version of the map was built using Adobe Illustrator, and it is accessible through this link: <a href='districtsix/digitalprototypedesktop.pdf' target='_blank'>DigitalPrototypeDesktop.pdf</a>",
                    1: "The digital prototype for the mobile version of the map was built using Figma, and the interactive version is accessible in this frame and also through this link: <a href='https://figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe?node-id=17%3A46&scaling=scale-down&redirected=1' target='_blank'>figma.com/proto/YC8xfxRYXYLaYJarzpc6jv7F/District-Six-Museum-Wireframe</a>.",
                },
            },
        },
        "embed": {
            0: {
                "txt": "Particular <span class='keyword'>interaction features</span> were programmed to support exploration of the large quantity of content contained within the map:<ul><li>togglable layers allowed focusing on particular content such as individual resident’s stories or groups of community landmarks by graphically highlighting the selected layer’s points of interest and gently fading the rest</li><li>image slideshows enabled scrolling through photos taken over the course of each resident’s life without overcrowding the screen</li><li>an image overlay would cover the screen upon clicking any individual image, making the historical photos larger for better viewing as well as displaying accompanying textual descriptions about their significance</li><li>audio players lent an additional dimension of immersion through recordings of residents discussing life in District Six in their own voices</li></ul>",
                "img": {
                    0: "thumbnail.png",
                },
                "alt": {
                    0: "temp alt text implement0",
                },
            },
            1: {
                "txt": "We built a lengthy <span class='keyword'>implementation process</span> to integrate the disparate pieces produced by the different members of the team. District Six community landmark data collected from the museum archives as well as data points of former residents’ life stories gathered from interviews organized in Excel spreadsheets and historical building footprints outlined in Illustrator were imported into open source QGIS mapping software where they were geolocated and assigned to corresponding map layers. From QGIS, the qgis2web plugin exported that compiled map to a HTML, CSS, and JavaScript web code representation on top of which additional features were developed including toggleable layers and embedding historical photos and audio recordings. This fully developed code was uploaded to a newly created GitHub repository in the museum’s name, and to have the interactive map rendered online we inserted an iframe element linking to the GitHub-hosted code on a dedicated webpage on the museum’s WordPress website.",
                "img": {
                    0: "thumbnail.png",
                },
                "alt": {
                    0: "temp alt text implement1",
                },
            },
            2: {
                "txt": "At the close of the project, we included <span class='keyword'>sustainability recommendations</span> in our deliverables submitted to the museum administration. In addition to describing further work that could be undertaken to enhance the interactive map such as evaluating visitor navigation as well as implementing the mobile version that was determined to be beyond scope with our timeline, we included a conceptual breakdown of domain knowledge and technological capabilities that the museum should consider bringing into their staff to be able to continue to engage in these types of digital scholarship projects going forward.",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "murphybed": {
        "title": "Fold-Down Murphy Bedframe ",
        "tags": "product design, ergonomic analysis, manufacturing",
        "subtitle": "To live in a 200-square-foot apartment, I needed to adjust to optimize living space. Since a bed would take up much of the available area despite only being used for a third of each day living there, I considered getting a Murphy bed frame that could be folded up against the wall when not in use. However, the available options on the market were around $1000 or above, well outside of my budget especially considering that selecting a small apartment was meant to conserve finances to begin with. Therefore, I designed, manufactured, and assembled my own folding bed frame.",
        "artifact": "",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "The <span class='keyword'>design objectives</span> could be quickly defined because I personally understood the scope, goals, and constraints of the project that I hoped to achieve:<ul><li>space-efficient: the design needed to fit within the dimensions of the apartment, and ideally it should integrate other space-saving features</li><li>economical: the money and time cost of materials, manufacturing, and assembly must be kept low</li><li>ergonomic: only a reasonable amount of energy should be required to convert between positions, and all interfaces must be comfortable for interactions with my physical characteristics</li><li>durable: the solution has to withstand the stress of daily use for its lifetime</li><li>simple: the solution must be designed and manufactured by me using available resources and processes</li></ul>",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "Conducting <span class='keyword'>market research</span> on existing products provided insight into methods of accomplishing the core folding function as well as into other design features that may or may not be desirable:<ul><li>spring-assisted folding reduces the amount of energy required to lift the bedframe</li><li>hinge systems enable folding through less space usage</li><li>cabinets, drawers, and shelves provide storage space, obscure articulating mechanisms for cleaner appearance, and block access to them to prevent injury</li><li>pocket space that bed folds up into lends a cleaner appearance to the folded-up position</li><li>seating space made available in the folded-up position</li></ul>",
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
        "embed": {
            0: {
                "txt": "The <span class='keyword'>design features</span> of the final version to be manufactured were:<ul><li>Folding where up position is maintained by center of gravity being past the tipping point</li><li>Ergonomic seating bench</li><li>Storage space</li><li>Stain and polyurethane for appearance, comfort, and durability</li></ul>",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "For <span class='keyword'>ecological impact reduction</span> (and complimentary cost savings), I sourced materials such as bamboo plywood and scrap wood from a local environmentally-friendly materials distributor. This stock was cut to size and shape using the tools available in a local workshop, and the leftover scrap was donated to the workshop following manufacturing and assembly.",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "The legs supporting the folded-down position underwent <span class='keyword'>design interactions</span> over the course of using the bed frame. The first iteration was produced quickly in order to be able to begin using the bed as soon as possible, but their instability and fragility soon demanded a reconsideration. The second iteration was sized to fit neatly within the bottom storage compartment when not in use, and its frame-like construction enabled ease of handling since a single hand could grasp multiple from various orientations, but unfortunately design also eventually proved to be structurally insufficient. The third and final iteration resolved the durability issue as these legs survived to the end of the bed frame’s use while retaining the proven desirable features of easy storage and easy handling of the previous design.",
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
        "examine": {
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
        "embed": {
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
        "subtitle": "Low voter turnout among young adults in local elections motivated our team to explore the factors contributing to low civic engagement (political participation, volunteering, serving the community, social action, and actively seeking information about civic issues), and we learned that university students in particular face unique challenges to becoming engaged with the broader local community. To address this issue, we designed a new production and distribution service that involved students in the production process and provided digestible and actionable news content. Design evaluation testing suggested that such a service might be able to contribute towards increasing university student civic engagement.",
        "artifact": "",
        "artifactAlt": "",
        "examine": {
            0: {
                "txt": "Our team conducted a <span class='keyword'>literature review</span> of published research on the characteristics of groups who were or were not civically engaged and the factors that influenced their likelihood of participating in such activities. From this initial overview, we were able to identify that university students comprised a large population with particular barriers. Since university students would be plentifully accessible in our local environment throughout the course of the project, we decided to focus our scope to target the needs and goals of university students with regard to civic engagement.",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "We wrote and distributed a <span class='keyword'>survey</span> to a broader group of students to see the relevant trends ____ that parsing through a large amount of daily information is difficult, and that civic activities that have direct, quick impact are more motivating.",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "We invited several students to participate in contextual inquiry <span class='keyword'>interviews and focus groups</span> to get a deeper understanding of the mindset, ________ Our findings included that Ann Arbor being a politically vocal space can be intimidating, that lack of connection to community leads to non-engagement",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "problem statement and design objectives",
                "img": "",
                "alt": "",
            },
        },
        "experiment": {
            0: {
                "txt": "brainstorming",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "design prioritization",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "protoype and preliminary testing",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "",
                "img": "",
                "alt": "",
            },
        },
        "embed": {
            0: {
                "txt": "service blueprint and design features",
                "img": "",
                "alt": "",
            },
            1: {
                "txt": "usability testing",
                "img": "",
                "alt": "",
            },
            2: {
                "txt": "guerilla testing",
                "img": "",
                "alt": "",
            },
            3: {
                "txt": "interview",
                "img": "",
                "alt": "",
            },
        },
        "thumbnail": "thumbnail.png",
        "extra": "",
    },
    "veggiefresh": {
        "title": "VeggieFresh Consumer Food Storage Product Design",
        "tags": "product design, market research, quantitative data analysis, design engineering, business planning",
        "subtitle": "Each year in the United States, 21% of the total food supply is lost at the individual consumer level - about 90 billion pounds of waste costing $450 per person. To address this issue, our team researched the existing market of food storage products to identify design opportunities, defined design objectives based on consumer pain points, brainstormed a diversity of potential ideas, prototyped and optimized one design that best fit the design objectives, and outlined a business plan for manufacturing, distribution, and sale. Our final design was VeggieFresh: an in-fridge, container storage vacuum preservation system that improves shelf life and visibility of stored food.",
        "artifact": "prototype.jpg",
        "artifactAlt": "Physical prototype manufactured to demonstrate the form and function of the final designed consumer product",
        "examine": {
            0: {
                "txt": "interviews and surveys",
                "img": "",
                "alt": "",
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
                "img": "",
                "alt": "",
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
        "embed": {
            0: {
                "txt": "3D modeling for establishing final product appearance",
                "img": {
                    0: "cad.gif",
                    1: "cad2.gif",
                },
                "alt": {
                    0: "animation of intended product usage1",
                    1: "animation of intended product usage2",
                },
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
        "examine": {
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
        "embed": {
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
        "examine": {
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
        "embed": {
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
