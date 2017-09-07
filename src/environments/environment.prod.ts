export const environment = {
  production: true
};

document.write(`
<script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDq2ll0XynIzyIXhm1VOTVcHbrmtK7Di_4",
    authDomain: "fazendocontas-aa396.firebaseapp.com",
    databaseURL: "https://fazendocontas-aa396.firebaseio.com",
    projectId: "fazendocontas-aa396",
    storageBucket: "",
    messagingSenderId: "290811124634"
  };
  firebase.initializeApp(config);

</script>

<!-- Google AdSense: https://www.google.com/adsense/ -->
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-7984022795575531",
    enable_page_level_ads: true
  });

</script>

<!-- Google Analytics: https://analytics.google.com/ -->
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-105578724-1', 'auto');
  ga('send', 'pageview');

</script>
`);
