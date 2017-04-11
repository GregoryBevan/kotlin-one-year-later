// load css
import './css/style.css';

// load json
import slides from './slides/slides.json';

// load Reveal
import Reveal from 'reveal';

var libPath = 'revealjs/';

insertSlides();

Reveal.initialize({
    width: '100%',
    height: '100%',
    controls: false,
    progress: false,
    history: true,
    center: true,
    transition: 'convex', // default/cube/page/concave/zoom/linear/fade/none
    backgroundTransition: 'fade',
    rollingLinks: true,
    slideNumber: false,
    mouseWheel: false,
    margin: 0,
    theme: 'revealjs/css/theme/white.css',
    keyboard: {
        38: 'next',
        40: 'prev'
    },
    markdown: {
        smartypants: true
    },
    dependencies: [
        // Cross-browser shim that fully implements classList
        {
            src: libPath + 'lib/js/classList.js',
            condition: function() {
                return !document.body.classList;
            }
        },

        // Interpret Markdown in <section> elements
        {
            src: libPath + 'plugin/markdown/marked.js',
            condition: function() {
                return !!document.querySelector('[data-markdown]');
            }
        },

        {
            src: libPath + 'plugin/markdown/markdown.js',
            condition: function() {
                return !!document.querySelector('[data-markdown]');
            }
        },

        // Syntax highlight for <code> elements
        {
            src: libPath + 'plugin/highlight/highlight.js',
            async: true,
            callback: function() {
                hljs.initHighlightingOnLoad();
            }
        },

        // Zoom in and out with Alt+click
        { src: libPath + 'plugin/zoom-js/zoom.js', async: true },

        // Speaker notes
        { src: libPath + 'plugin/notes/notes.js', async: true }
    ]
});

function insertSlides() {
    console.log('Insert following slides');
    console.log(slides);

    var slideContainer = document.querySelector('.slides');
    slides.forEach(slideLoader);

    function slideLoader(path) {
      if(path.endsWith(".md")) {
        markdownLoader(path);
      } else {
        htmlLoader(path);
      }
    }

    function markdownLoader(path) {
      var chapter = document.createElement('section');
      chapter.dataset.markdown = 'slides/' + path;
      chapter.dataset.separator = '^\n---\n';
      chapter.dataset.vertical = '^\n\n';
      chapter.dataset.notes = '^Notes :';
      chapter.dataset.charset = 'utf-8';
      slideContainer.appendChild(chapter);
    }

    function htmlLoader(path) {
      var link = document.createElement('link');
      link.rel = 'import';
      link.href = 'slides/' + path;
      link.onload = function(e) {
        console.log()
        var post = this.import.querySelector('[id=\'' + path.replace('.html', '\'') +']');
        slideContainer.appendChild(post.cloneNode(true));
      };
      document.head.appendChild(link);
    }
}
