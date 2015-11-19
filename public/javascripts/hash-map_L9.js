$(document).ready(function() {
    var map = new HashMap();
    var key, value, inputString, output, delKey;
    $('#js_input').on('click', function (){
        key = $('#js_inputKey').val();
        value = $('#js_inputValue').val();
        map.put(key, value);
        console.log('Пару додано.');
    });
    $('#js_parserStringAndAddMap').on('click', function (){
        inputString = $('#js_inputString').val();
        map.parserStringAndAddMap(inputString);
        console.log('Кількість доданих пар: ' + map.parserStringAndAddMap(inputString));
    });
    $('#js_string').on('click', function (){
        console.log(map.toString());
    });
    $('#js_entrySet').on('click', function (){
        console.log(map.entrySet());
    });
    $('#js_output').on('click', function (){
        output = $('#js_outputKey').val();
        if(map.data.hasOwnProperty(output)){
            map.get(output);
            console.log('Для ключа: ' + output + ', присвоєне значення: ' + map.get(output));
        }else{
            console.log('Пару із ключем: ' + output + ', не знайдено.');
        };
    });
    $('#js_del').on('click', function (){
        delKey = $('#js_delKey').val();
        if(map.data.hasOwnProperty(delKey)){
            console.log('Видалено пару із ключем: ' + delKey + ' і  значенням: ' + map.get(delKey) + '.');
            map.remove(delKey);
        }else{
            console.log('Пару із ключем: ' + delKey + ', не знайдено.');
        };
    });
    $('#js_isEmpty').on('click', function (){
        map.isEmpty();
        console.log('HashMap - пустий? ("' + map.isEmpty() + '").');
    });
    $('#js_checkKey').on('click', function (){
        map.size();
        console.log('Кількість пар рівна: ' + map.size() + '.');
    });
});

function HashMap(){
    this.keys = [];
    this.data = {};
}

HashMap.prototype.put = function(key, value){
    if(this.data[key] == null){
        this.keys.push(key);
        this.data[key] = value;
    }else{
        this.data[key] = value;
    }
    return true;
};

HashMap.prototype.parserStringAndAddMap = function(str){
    var count = 0;
    if(str && str.length > 0){
        str = str.trim();
        var startIndex = str.indexOf('{');
        var endIndex = str.lastIndexOf('}');
        if(startIndex !== -1 && endIndex !== -1){
            str = str.substring(startIndex+1, endIndex);
            var arrs = str.split(',');
            for(var i = 0; i < arrs.length; i++){
                var kv = arrs[i].trim();
                if(kv.length > 0 && kv.indexOf('=') !== -1){
                    var kv_arr = kv.split('=');
                    if(kv_arr.length == 2){
                        if(this.put(kv_arr[0].trim(), kv_arr[1].trim())){
                            count++;
                        }else{
                            console.error('error: kv:' + kv);
                        }
                    }
                }
            }
        }else{
            console.log('data error:' + str);
        }
    }else{
        console.log('data is not empty');
    }
    return count;
};

HashMap.prototype.toString = function(){
    var s = "{";
    for(var i = 0; i < this.keys.length; i++){
        var k = this.keys[i];
        s += k + ":" + this.data[k];
        if(this.keys.length > i+1){
            s += ','
        }
    }
    s += "}";
    return s;
};

HashMap.prototype.entrySet = function(){
    var set = this.keys.length;
    var entry = new Array(set);
    for (var i = 0; i < set; i++) {
        entry[i] = {
            key : this.keys[i],
            value : this.data[this.keys[i]]
        };
    }
    return entry;
};

HashMap.prototype.get = function(key){
    return this.data[key];
};

HashMap.prototype.remove = function(key){
    for(var i = 0; i < this.keys.length; i++){
        if(key == this.keys[i]){
            //remove it from the hash /удалить его из хэша
            delete this.data[this.keys[i]];
            //and throw away the key... /и выбросить ключ ...
            this.keys.splice(i ,1);
        };
    };
};

HashMap.prototype.isEmpty = function(){
    return this.keys.length == 0;
};

HashMap.prototype.size = function(){
    return this.keys.length;
};
