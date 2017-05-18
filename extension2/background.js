var headerInfo = {};
chrome.webRequest.onHeadersReceived.addListener(function(n) {
    parseInt(n.tabId, 10) > 0 && (typeof headerInfo[n.tabId].response[0] != "undefined" && headerInfo[n.tabId].response[0].requestId !== n.requestId && (headerInfo[n.tabId].response = []), headerInfo[n.tabId].response.push(n))
}, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
}, ["responseHeaders"]), chrome.webRequest.onSendHeaders.addListener(function(n) {
    parseInt(n.tabId, 10) > 0 && (typeof headerInfo[n.tabId] == "undefined" ? (headerInfo[n.tabId] = {}, headerInfo[n.tabId].request = [], headerInfo[n.tabId].response = []) : headerInfo[n.tabId].request[0].requestId !== n.requestId && (headerInfo[n.tabId].request = []), headerInfo[n.tabId].request.push(n))
}, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
}, ["requestHeaders"]); 