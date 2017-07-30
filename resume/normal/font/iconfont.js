;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-phone" viewBox="0 0 1377 1024">' +
    '' +
    '<path d="M540.387741 711.063965l295.861532 0L836.249273 224.26502l-295.861532 0L540.387741 711.063965 540.387741 711.063965zM688.318507 0C405.547762 0 176.321374 229.232122 176.321374 512.002867s229.232122 511.997133 511.997133 511.997133c282.770745 0 512.002867-229.232122 512.002867-511.997133C1200.321374 229.232122 971.089253 0 688.318507 0L688.318507 0zM913.687327 803.324482c0 25.337238-20.533556 45.872227-45.872227 45.872227l-358.993185 0c-25.332938 0-45.872227-20.534989-45.872227-45.872227L462.949687 200.035882c0-25.332938 20.53929-45.872227 45.872227-45.872227l358.993185 0c25.338672 0 45.872227 20.53929 45.872227 45.872227L913.687327 803.324482 913.687327 803.324482zM913.687327 803.324482"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-github" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1.3 525.3c0 223 142.9 412.6 342.1 482.2 26.8 6.8 22.7-12.4 22.7-25.4l0-88.5C211.2 911.8 205 809.2 194.5 792.1c-21.1-35.9-70.7-45-55.9-62.1 35.3-18.2 71.2 4.6 112.9 66.1 30.2 44.6 88.8 37.1 118.7 29.6 6.5-26.8 20.5-50.7 39.6-69.4-160.3-28.5-227.3-126.5-227.3-243 0-56.4 18.6-108.4 55.2-150.3-23.2-69.2 2.2-128.2 5.6-137 66.3-6 135.1 47.4 140.5 51.6 37.7-10.1 80.7-15.6 128.8-15.6 48.4 0 91.6 5.6 129.5 15.8 12.9-9.8 76.8-55.6 138.4-50 3.3 8.8 28.1 66.5 6.3 134.7 37 42 55.8 94.3 55.8 151 0 116.7-67.3 214.8-228.2 243.1 26.9 26.5 43.5 63.3 43.5 104l0 128.4c0.9 10.2 0 20.5 17.2 20.5 202.1-68.1 347.6-259.1 347.6-484.1 0-282.1-228.7-510.7-510.7-510.7C229.9 14.6 1.3 243.2 1.3 525.3z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-mail" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.737524 8.821841C233.289143 8.821841 6.889651 234.343619 6.889651 512.581079c0 278.235429 226.399492 503.738921 505.847873 503.738921 279.253333 0 505.658921-225.50146 505.658921-503.738921C1018.396444 234.343619 791.903492 8.821841 512.737524 8.821841L512.737524 8.821841zM801.483175 676.959492c0 22.759619-18.472635 41.124571-41.315556 41.124571L265.002667 718.084063c-22.729143 0-41.315556-18.364952-41.315556-41.124571L223.687111 348.07873c0-3.565714 1.263746-6.779937 1.958603-10.114032l268.814222 267.745524c3.937524 3.902984 9.124571 5.96927 14.67327 5.96927 5.420698 0 10.731683-2.18819 14.646857-5.96927l274.592508-273.601016c1.958603 4.926984 3.226413 10.207492 3.226413 15.967492l0 328.880762L801.483175 676.95746 801.483175 676.959492zM265.002667 307.051683l495.280762 0c1.507556 0 2.651429 0.688762 4.167111 0.806603L509.013333 562.159746 254.843937 309.002159C258.186159 308.191492 261.416635 307.051683 265.002667 307.051683L265.002667 307.051683z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-web" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 0C227.555556 0 0 227.555556 0 512s227.555556 512 512 512 512-227.555556 512-512S796.444444 0 512 0zM768 557.511111c0 0-11.377778 0-22.755556 0-108.088889 0-216.177778 0-324.266667 0-5.688889 0-11.377778 0-22.755556 0 0 0 5.688889 17.066667 5.688889 28.444444 11.377778 39.822222 45.511111 62.577778 85.333333 73.955556 62.577778 22.755556 125.155556 17.066667 187.733333-5.688889 11.377778-5.688889 28.444444-11.377778 39.822222-17.066667 0 39.822222 0 73.955556 0 108.088889 0 5.688889-5.688889 11.377778-11.377778 11.377778-73.955556 28.444444-147.911111 39.822222-221.866667 22.755556-159.288889-34.133333-227.555556-233.244444-119.466667-352.711111 22.755556-22.755556 45.511111-51.2 73.955556-62.577778C426.666667 392.533333 415.288889 392.533333 398.222222 449.422222c68.266667 0 130.844444 0 199.111111 0 0-56.888889 0-51.2-17.066667-79.644444-11.377778-22.755556-34.133333-28.444444-56.888889-34.133333C438.044444 318.577778 369.777778 347.022222 312.888889 403.911111c-17.066667 17.066667-34.133333 39.822222-56.888889 62.577778 5.688889-22.755556 11.377778-45.511111 17.066667-62.577778 51.2-153.6 227.555556-216.177778 364.088889-130.844444 62.577778 39.822222 91.022222 96.711111 108.088889 164.977778 11.377778 34.133333 17.066667 68.266667 17.066667 102.4C768 546.133333 768 551.822222 768 557.511111z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)