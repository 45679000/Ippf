  function fun(name,password) { 
  console.log(name + " => " +password);
 fetch("http://192.168.1.212:8080/login.xhtml", {
  credentials: "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/x-www-form-urlencoded",
        "Upgrade-Insecure-Requests": "1",
        crossDomain: true,
        xhrFields: { withCredentials: true },
          'Access-Control-Allow-Origin':'*',
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "http://192.168.1.212:8080/login.xhtml",
    "body": "j_idt4=j_idt4&j_idt4%3Aj_idt6=samson&j_idt4%3Aj_idt7=admin123&j_idt4%3Apopdistancecalc=Submit&javax.faces.ViewState=stateless",
    "method": "POST",
    "mode": "no-cors"
})
//test
}
// fun();