export default function sendMessage(msg) {
    var message = {
        ...msg,
    };
    try {
        setTimeout(() => {
            window?.ReactNativeWebView?.postMessage(JSON.stringify(message));
        }, 1000)
    }
    catch (err) {
        console.info('----------------------------');
        console.info('err =>', err);
        console.info('----------------------------');
    }
}