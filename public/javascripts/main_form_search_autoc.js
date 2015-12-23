"use strict";
$(document).ready(function() {

    $("input#main_form_search").myAutocomplete({

        /*'setURL', 'setJSON', 'setObject', 'setArray' для вибору способа отримання варіантів автокомпліта.
         ПОТРІБНО ВИБРАТИ ТІЛЬКИ ОДИН З НАСТУПНИХ ЧОТИРЬОХ ПАРАМЕТРІВ.
         'setURL', 'setJSON', 'setObject', 'setArray' to choose ways of getting auto complete options.
         You must select only one of these four parameters */
        //
        setURL: "/company-db",              //URL для запроса на сервер з БД (запрос на сервер буде відправлятися з ключем "queryToDB"). URL for the request to the server with the database, (request to the server will be sent with the key "query To DB").
        //setJSON: '/task.json',              //путь до json-файла. the path to the json file.
        //setObject: [ { company: 'Voipa', country: 'Greece' }, { company: 'Comtour', country: 'Kyrgyzstan' }, { company: 'Surelogic', country: 'Andorra' }, { company: 'Gluid', country: 'Indonesia' }, { company: 'Xplor', country: 'Brazil' }, { company: 'Opticall', country: 'Grenada' }, { company: 'Enquility', country: 'Belgium' }, { company: 'Cipromox', country: 'New Caledonia' }, { company: 'Balooba', country: 'Yemen' }, { company: 'Insuresys', country: 'Turkey' }, { company: 'Apextri', country: 'Zambia' }, { company: 'Zerbina', country: 'Nigeria' }, { company: 'Zillanet', country: 'St. Pierre and Miquelon' }, { company: 'Everest', country: 'Greenland' }, { company: 'Decratex', country: 'Mali' }, { company: 'Talkalot', country: 'Kazakhstan' }, { company: 'Ohmnet', country: 'Ghana' }, { company: 'Quantasis', country: 'Belize' }, { company: 'Keengen', country: 'Burundi' }, { company: 'Waretel', country: 'Luxembourg' }, { company: 'Orbalix', country: 'Christmas Island' }, { company: 'Autograte', country: 'East Timor' }, { company: 'Centuria', country: 'Turkmenistan' }, { company: 'Snowpoke', country: 'Ethiopia' }, { company: 'Vendblend', country: 'Pakistan' }, { company: 'Obones', country: 'Fiji' }, { company: 'Malathion', country: 'China' }, { company: 'Mediot', country: 'Macedonia' }, { company: 'Phormula', country: 'Tanzania' }, { company: 'Supremia', country: 'US Minor Outlying Islands' }, { company: 'Crustatia', country: 'Uganda' }, { company: 'Hawkster', country: 'South Africa' }, { company: 'Digiprint', country: 'Saint Kitts and Nevis' }, { company: 'Geekola', country: 'Jamaica' }, { company: 'Pivitol', country: 'Solomon Islands' }, { company: 'Apex', country: 'Iceland' }, { company: 'Exospace', country: 'Lithuania' }, { company: 'Futurize', country: 'Tuvalu' }, { company: 'Typhonica', country: 'Benin' }, { company: 'Assistia', country: 'Honduras' }, { company: 'Geeketron', country: 'French Polynesia' }, { company: 'Magmina', country: 'Eritrea' }, { company: 'Pheast', country: 'Guatemala' }, { company: 'Futurity', country: 'Cote D\'Ivoire (Ivory Coast)' }, { company: 'Xanide', country: 'Ecuador' }, { company: 'Utara', country: 'Malawi' }, { company: 'Furnafix', country: 'Aruba' }, { company: 'Portaline', country: 'Israel' }, { company: 'Daisu', country: 'Trinidad and Tobago' }, { company: 'Suremax', country: 'Bolivia' }, { company: 'Bugsall', country: 'Bermuda' }, { company: 'Momentia', country: 'S. Georgia and S. Sandwich Isls.' }, { company: 'Kiggle', country: 'New Zealand' }, { company: 'Idetica', country: 'Sierra Leone' }, { company: 'Bullzone', country: 'Norfolk Island' }, { company: 'Artiq', country: 'Mongolia' }, { company: 'Remotion', country: 'Guinea-Bissau' }, { company: 'Omnigog', country: 'Macau' }, { company: 'Furnitech', country: 'Bouvet Island' }, { company: 'Digifad', country: 'Congo' }, { company: 'Grainspot', country: 'Tokelau' }, { company: 'Tourmania', country: 'Brunei Darussalam' }, { company: 'Accel', country: 'Cyprus' }, { company: 'Ewaves', country: 'Togo' }, { company: 'Xoggle', country: 'Saudi Arabia' }, { company: 'Comtrek', country: 'Nicaragua' }, { company: 'Musanpoly', country: 'Mozambique' }, { company: 'Calcu', country: 'Colombia' }, { company: 'Neurocell', country: 'Puerto Rico' }, { company: 'Sustenza', country: 'Anguilla' }, { company: 'Uxmox', country: 'Sweden' }, { company: 'Shadease', country: 'Norway' }, { company: 'Portico', country: 'Germany' }, { company: 'Enthaze', country: 'Chad' }, { company: 'Stelaecor', country: 'Mexico' }, { company: 'Hydrocom', country: 'St. Helena' }, { company: 'Endipin', country: 'Bahamas' }, { company: 'Multron', country: 'Jordan' }, { company: 'Octocore', country: 'Japan' }, { company: 'Neteria', country: 'Austria' }, { company: 'Dogtown', country: 'Viet Nam' }, { company: 'Xumonk', country: 'Madagascar' }, { company: 'Ontality', country: 'United Kingdom' }, { company: 'Stockpost', country: 'Kenya' }, { company: 'Furnigeer', country: 'Wallis and Futuna Islands' }, { company: 'Digigen', country: 'Netherlands Antilles' }, { company: 'Letpro', country: 'Cocos (Keeling Islands)' }, { company: 'Lingoage', country: 'Bangladesh' }, { company: 'Namebox', country: 'Micronesia' }, { company: 'Twiggery', country: 'Guadeloupe' }, { company: 'Paragonia', country: 'France' }, { company: 'Corecom', country: 'Liechtenstein' }, { company: 'Bytrex', country: 'Azerbaijan' }, { company: 'Geoform', country: 'Peru' }, { company: 'Xiix', country: 'Tunisia' }, { company: 'Assistix', country: 'Dominican Republic' }, { company: 'Manufact', country: 'Canada' }, { company: 'Jumpstack', country: 'Paraguay' }, { company: 'Duoflex', country: 'Turks and Caicos Islands' }, { company: 'Arctiq', country: 'Falkland Islands (Malvinas)' } ],   //Для передачі об'єкта в якості БД. To send object with the database.
        //setArray: [ 'Voipa', 'Comtour', 'Surelogic', 'Gluid', 'Xplor', 'Opticall', 'Enquility', 'Cipromox', 'Balooba', 'Insuresys', 'Apextri', 'Zerbina', 'Zillanet', 'Everest', 'Decratex', 'Talkalot', 'Ohmnet', 'Quantasis', 'Keengen', 'Waretel', 'Orbalix', 'Autograte', 'Centuria', 'Snowpoke', 'Vendblend', 'Obones', 'Malathion', 'Mediot', 'Phormula', 'Supremia', 'Crustatia', 'Hawkster', 'Digiprint', 'Geekola', 'Pivitol', 'Apex', 'Exospace', 'Futurize', 'Typhonica', 'Assistia', 'Geeketron', 'Magmina', 'Pheast', 'Futurity', 'Xanide', 'Utara', 'Furnafix', 'Portaline', 'Daisu', 'Suremax', 'Bugsall', 'Momentia', 'Kiggle', 'Idetica', 'Bullzone', 'Artiq', 'Remotion', 'Omnigog', 'Furnitech', 'Digifad', 'Grainspot', 'Tourmania', 'Accel', 'Ewaves', 'Xoggle', 'Comtrek', 'Musanpoly', 'Calcu', 'Neurocell', 'Sustenza', 'Uxmox', 'Shadease', 'Portico', 'Enthaze', 'Stelaecor', 'Hydrocom', 'Endipin', 'Multron', 'Octocore', 'Neteria', 'Dogtown', 'Xumonk', 'Ontality', 'Stockpost', 'Furnigeer', 'Digigen', 'Letpro', 'Lingoage', 'Namebox', 'Twiggery', 'Paragonia', 'Corecom', 'Bytrex', 'Geoform', 'Xiix', 'Assistix', 'Manufact', 'Jumpstack', 'Duoflex', 'Arctiq' ],         //Для передачі масіва в якості БД. To send array with the database.


        chooseField: 'company',         //по якому полі проводити виборку (параметр ОБОВ'ЯЗКОВИЙ для заповнення при роботі з 'setObject' або 'setJSON', поумолчянію: невказано).
                                        //by which the field to carry out the sampling (option is required when working with 'setObject' or 'getJSON', default: unspecified).

        inputName: 'autocomplete',      //значення для атрибута name вибраного input (використовується для запроса на сервер, поумолчянію: невказано).
                                        //name attribute value (used to request on the server when, default: default)


        placeHolder: 'Search',    //значення для атрибута placeholder вибраного input (поумолчянію: невказано).
                                        // placeholder attribute value (default: default)

        //inputType: 'email',           //значення для атрибута type вибраного input (поумолчянію: "text").
                                        //type attribute value (default: "text")

        //colorStyle: 'selfStyle',        //набор стилів для автокомпліта, співпадають із стилями Bootstrap (поумолчянію: defaultStyle).
                                        //Styles of elements autocomplete (default: "defaultStyle").
                                        //(others: 'selfStyle', 'warningStyle', 'errorStyle', 'successStyle');

        //autoFocus: true,                //активація автофокуса на input (поумолчянію: false).
                                        // activation of focus true/false (default: false)

        minLength: 2,                   //мінімальна кількість введених символів для активації автокомпліта (поумолчянію: 3).
                                        // number of characters to activate the auto complete (default: 3)

        delay: 500,                    //чяс затримки між нажанням клавіши і активацією автокомпліта (поумолчянію: 1 мс).
                                        // the delay time of query autocompletion (default: 1ms)

        ignoreCase: true,               //чи буде ігноруватися регістри (поумолчянію: false).
                                        //or registers will be ignored (default: false)

        searchInside: true,             //также показувати варіанти, в яких є співпадання всередині строки (поумолчянію: false).
                                        // also show variations where the are coincidence inside of terms (default: false)

        visualEffect: true              //виділяти в варіантах автокомпліта підстроку запроса іншим стилем (поумолчянію: false).
                                        //allocate substring of request in variations another style (default: false)

    });
});