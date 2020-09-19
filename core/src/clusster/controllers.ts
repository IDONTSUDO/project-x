const vm = require('vm');
const Emitter = require("events");
let emitter = new Emitter();
/**@problem воспроизводство прибывшего контекста. 
 */
emitter.on("sub-context", function (Context) {
    
});

/**@problem обмен сообщениями и воспрсизводство их.
 */
emitter.on('pub-message',function(Context) {
    vm.createContext(`${Context}`);
})