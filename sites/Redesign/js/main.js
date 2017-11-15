"use strict";

var newRows = [
	["Azerty On working days before 23.00, ordered tomorrow! ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 79.90 ", "€ 79.90 ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Megekko ordered on Saturday and Sunday? Monday at home!  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 75,95  ", "€ 79.90  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["CD-ROM-LAND Breda Ordered at 22:30, tomorrow at home!  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 79,95  ", "€ 79,95  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Informatique All 8 years computer store of the year!  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 79,95  ", "€ 81.94  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["SWW Computer  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i></span>', "€ 83.90  ", "€ 83.90  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Alternate.nl On working days before 22.00, ordered tomorrow!  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 83.90  ", "€ 83.90  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Coolblue.nl Ordered for 23.59u? Tomorrow free delivery!  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 83.99  ", "€ 83.99  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Redable Your Reliable Fractal Design Specialist!  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 85, -  ", "€ 85, -  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Bol.com Plaza  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 85.94  ", "€ 85.94  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Max ICT BV 2.800.000 Products for SMEs & Consumers  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 82.20  ", "€ 86.65  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["Yorcom  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i></span>', "€ 95, -  ", "€ 95, -  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["High flow  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i></span>', "€ 89.90  ", "€ 96.40  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"],
	["ReplaceDirect.nl Free shipping from € 20 and free return  ", '<span class="material-icons-set material-icons-set--green"><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i></span>', "€ 109.99  ", "€ 109.99  ", "<button class='mdc-button mdc-button--raised'>Bekijk</button>"]
];

var MDCTab = mdc.tabs.MDCTab;
var MDCTabFoundation = mdc.tabs.MDCTabFoundation;
var MDCTabBar = mdc.tabs.MDCTabBar;
var MDCTabBarFoundation = mdc.tabs.MDCTabBarFoundation;
var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
var dots = document.querySelector('.dots');
var panels = document.querySelector('.panels');
dynamicTabBar.preventDefaultOnClick = true;

function updatePanel(index) {
	var activePanel = panels.querySelector('.panel.active');
	if (activePanel) {
		activePanel.classList.remove('active');
	}
	var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
	if (newActivePanel) {
		newActivePanel.classList.add('active');
	}
}
dynamicTabBar.listen('MDCTabBar:change', function(_ref) {
	var tabs = _ref.detail;

	var nthChildIndex = tabs.activeTabIndex;
	updatePanel(nthChildIndex);
});

var btnEl = document.querySelector('.mdc-button');
var btn = new mdc.ripple.MDCRipple.attachTo(btnEl);

var myTable = document.querySelector('table');

var dataTable = new DataTable(myTable, {

	// the maximum number of rows to display on each page
	perPage: 10,

	// the per page options in the dropdown
	perPageSelect: [5, 10, 15, 20, 25],

	// navigation options
	nextPrev: true,
	firstLast: true,
	prevText: '&lsaquo;',
	nextText: '&rsaquo;',
	firstText: '&laquo;',
	lastText: '&raquo;',

	// enable sortable
	sortable: true,

	// enable searchable
	searchable: true,

	// fix the width of the columns.
	fixedColumns: true,

	// fix the height of the table. 
	fixedHeight: false,

	// truncate the page links to prevent overflow with large datasets.
	truncatePager: true,
	layout: {
		top: "{search}",
		bottom: "{select}{info}{pager}"
	},
	labels: {
		placeholder: "Search...",
		perPage: "{select}",
		noRows: "No entries to found",
		info: " {start}-{end} of {rows} "
	}

});

dataTable.rows().add(newRows);

var elem = document.querySelector('.m-p-g');

document.addEventListener('DOMContentLoaded', function() {
	var gallery = new MaterialPhotoGallery(elem);
});

var listGroupSubheader = document.querySelectorAll('.mdc-list-item');

for (var i = 0; i < listGroupSubheader.length; i++) {
	listGroupSubheader[i].addEventListener('click', function(evt) {
		evt.target.classList.toggle('expand');
	});
}

var sliders = document.querySelectorAll('.mdc-slider');

for (var i = 0; i < sliders.length; i++) {
	var slider = new mdc.slider.MDCSlider(sliders[i]);
}

mdc.autoInit();
