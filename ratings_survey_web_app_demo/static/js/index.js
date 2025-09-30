// Function for geting a random integer
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Function for shuffling an array
function arrShuffle(array, array2) {
    let currentIndex = array.length,  randomIndex;
   
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        [array2[currentIndex], array2[randomIndex]] = [array2[randomIndex], array2[currentIndex]];
    }
  
    return [array, array2];
}


// Function for sending post request to flask server with image data as a tensor
function sendDataToServer(sender, options){
    
    options.showDataSaving();
    console.log("sender: ", sender);


    // test_paths
    console.log("[SEND TO SERVER] test_paths: ", test_paths);
    console.log("[SEND TO SERVER] comp_paths: ", comp_paths);
    console.log("[SEND TO SERVER] comp_paths_2: ", comp_paths_2);

    dataJSON = {}

    // Get the answers
    dataJSON.answers = sender.data


    // Get the order of the questions
    dataJSON.test_survey = test_paths
    dataJSON.comp_survey = comp_paths
    dataJSON.comp_survey_2 = comp_paths_2

    // Get the test number
    dataJSON.testN = t_idx
    dataJSON.compN = c_idx
    
    $.ajax({
        type: "POST",
        url: "/postmethod",
        contentType: "application/json",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: function(response) {
            console.log(response);
            options.showDataSavingSuccess();
        },
        error: function(err) {  
            console.log(err);
            options.showDataSavingError();
        }
    });
}

//  We apply our style to the survey
var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];

// If you want to style your survey with different colors modify the following css classes

// defaultThemeColors["$header-background-color"]= "#d8e1e7"
// defaultThemeColors["$body-container-background-color"]= "#f6f7f2"
// defaultThemeColors["$main-color"]= "#3c4f6d"
// defaultThemeColors["$main-hover-color"]= "#2c3f5d"
// defaultThemeColors["$body-background-color"]= "white"
// defaultThemeColors["$inputs-background-color"]= "white"
// defaultThemeColors["$text-color"]= "#4a4a4a"
// defaultThemeColors["$text-input-color"]= "#4a4a4a"
// defaultThemeColors["$header-color"]= "#6d7072"
// defaultThemeColors["$border-color"]= "#e7e7e7"
// defaultThemeColors["$error-color"]= "#ed5565"
// defaultThemeColors["$error-background-color"]= "#fd6575"
// defaultThemeColors["$progress-text-color"]= "#9d9d9d"
// defaultThemeColors["$disable-color"]= "#dbdbdb"
// defaultThemeColors["$disabled-label-color"]= "rgba(64, 64, 64, 0.5)"
// defaultThemeColors["$slider-color"]= "white",
// defaultThemeColors["$disabled-switch-color"]= "#9f9f9f"
// defaultThemeColors["$disabled-slider-color"]= "#cfcfcf"
// defaultThemeColors["$foreground-light"]= "#909090"
// defaultThemeColors["$foreground-disabled"]= "#161616"
// defaultThemeColors["$background-dim"]= "#f3f3f3";
// defaultThemeColors["$progress-buttons-color"]= "#3C4F6D";
// defaultThemeColors["$progress-buttons-line-color"]= "#3C4F6D";

Survey.StylesManager.applyTheme(); 


// We declare the main structure of the survey allong with the first page 
// + demographics questions 
// + final feedback page

var defsurveyJSON = {
    title: "Σύνθεση Ομιλίας με τη χρήση τεχνητής νοημοσύνης - TTS ", // Translated
    description: " Δοκιμή για την αξιολόγηση της απόδοσης συστημάτων νευρωνικής σύνθεσης ομιλίας ", // Translated
    pages: [
        {
            name: "Intro",
            elements: [
                {
                    type: "html",
                    name: "Info",
                    html: "<p>Η έρευνα περιλαμβάνει την αξιολόγηση σύντομων ηχητικών κλιπ διάρκειας έως 10 δευτερόλεπτα.\n</p>\n\n<p>Στη συνέχεια, ο αξιολογητής καλείται να βαθμολογήσει τη φυσικότητα της ομιλίας του δοθέντος ηχητικού κλιπ σε κλίμακα Likert από 1 έως 5. Πριν ξεκινήσετε την αξιολόγηση βεβαιωθείτε ότι είστε σε ένα ήσυχο περιβάλλον και εάν είναι εφικτό φορέστε ακουστικά.\" .\n</p>\n\n\n<br>\n<br>\n<br>\n============================\n<p>\n<strong>Απαιτούμενος Περιηγητής:</strong> Firefox, Chrome, Safari\n</p>\n<p>\n<strong>Εκτιμώμενος χρόνος ολοκλήρωσης της έρευνας:</strong> 5 έως 10 λεπτά\n</p>\n\n<p> <strong>Για ερωτήσεις επικοινωνήστε με:</strong> <a href=\"mailto:syllasgiorgos@gmail.com\">syllasgiorgos@gmail.com</a> \n</p>" // Translated
                }
            ],
            title: " Πληροφορίες Έρευνας: " // Translated
        },
        {
            name: "Demographics",
            elements: [
                {
                    type: "radiogroup",
                    name: "question1",
                    title: "Πόσο χρονών είστε;", // Translated
                    isRequired: true,
                    choices: [
                        {
                            value: "item1",
                            text: "Κάτω από 20"
                        },
                        {
                            value: "item2",
                            text: "20-40"
                        },
                        {
                            value: "item2",
                            text: "Πάνω από 40"
                        }
                        // Add more age ranges as needed
                    ],
                    hasOther: false
                },
                {
                    type: "radiogroup",
                    name: "question2",
                    title: "Ποιο είναι το φύλο σας;", // Translated
                    isRequired: true,
                    choices: [
                        {
                            value: "item1",
                            text: "Άνδρας" // Translated
                        },
                        {
                            value: "item2",
                            text: "Γυναίκα" // Translated
                        },
                        {
                            value: "item3",
                            text: "'Αλλο" // Translated
                        }
                        
                    ],
                    hasOther: false
                },{
                    type: "radiogroup",
                    name: "question3",
                    title: "Είναι τα Ελληνικά η πρώτη σας γλώσσα;", // Translated
                    isRequired: true,
                    choices: [
                        {
                            value: "item1",
                            text: "Ναι" // Translated
                        },
                        {
                            value: "item2",
                            text: "Όχι" // Translated
                        }
                        
                    ],
                    hasOther: false
                },
                {
                    type: "rating",
                    name: "question4",
                    title: "Είστε εξοικειωμένοι με τη Μηχανική Μάθηση και την Τεχνητή Νοημοσύνη;", // Translated
                    isRequired: true,
                    minRateDescription: "Καθόλου", // Translated
                    maxRateDescription: "Πολύ" // Translated
                }
            ],
            title: " Δημογραφικά ", // Translated
            description: " Παρακαλώ απαντήστε στις ακόλουθες δημογραφικές ερωτήσεις. " // Translated
        },
        {
            name: "Feedback",
            elements: [
                {
                    type: "comment",
                    name: "feedback",
                    title: "Θα χαρούμε να λάβουμε παρατηρήσεις/σχόλια. (προαιρετικό)", // Translated
                    hideNumber: true
                }
            ],
            title: "Παρατηρήσεις", // Translated
            description: ""
        }
    ],
    showQuestionNumbers: "onPage",
    showProgressBar: "bottom",
    firstPageIsStarted: true
};

// We declare the format of the page that includes each wav audio with the rating question
var defTestPage = {
    name: "Test ",
    questions: [
        {
            type: "html",
            name: "audio-",
            html: "test"
        },
        {
            type: "rating",
            name: "question1a-",
            title: "Παρακαλώ βαθμολογήστε τη φυσικότητα της ομιλίας:", // Translated
            isRequired: true,
            rateMin: 1,
            rateMax: 5,
            rateStep: 1,
            minRateDescription: "Καθόλου φυσική", // Translated
            maxRateDescription: "Εντελώς φυσική" // Translated
        },
        {
            type: "rating",
            name: "question1b-",
            title: "Παρακαλώ βαθμολογήστε την ευκολία κατανόησης της ομιλίας:", // Translated
            isRequired: true,
            rateMin: 1,
            rateMax: 5,
            rateStep: 1,
            minRateDescription: "Δεν βγάζει νόημα", // Translated
            maxRateDescription: "Εϊναι πλήρως κατανοητή" // Translated
        }
    ],
    title: "Αξιολόγηση ", // Translated
    description: " Παρακαλώ ακούστε το ηχητικό και απαντήστε στην ερώτηση." // Translated
};


// We declare the format of the page that includes each wav audio with the rating question
var defComparePage = {
    name: "Compare ",
    questions: [
        {
            type: "html",
            name: "audio-",
            html: "test"
        },
        {
            type: "rating",
            name: "question2-",
            title: "Παρακαλώ συγκρίνετε την πρωτότυπη με την παραγόμενη πρόταση, και βαθμολογίστε την ομοιότητα του ομιλητή στα δύο ηχητικά:", 
            isRequired: true,
            rateMin: 1,
            rateMax: 5,
            rateStep: 1,
            minRateDescription: "Οι δύο ομιλητές δεν έχουν καμία ομοιότητα",
            maxRateDescription: "Οι δύο ομιλητές έχουν την ίδια φωνή"
        }
    ],
    title: "Σύγκριση ",
    description: "Ακούστε τα δύο κλιπ και βαθμολογήστε την ομοιότητα των ομιλητών."
};




// We declare which test we want to make as random choice for presenting to user
// Each test contains random ids corresponding to the wav files.
// tests_lst = [3,4,5] -> e.g. if we want to choose between test 3,4,5
// In total we have 6 tests
// var tests_lst = [0,1,2,3,4,5];
// var tests_lst = [0,2,4,5];
var tests_lst = [0,1,2,3,4];
var comp_lst = tests_lst

// We declare the name of the models. Must match the name of the folders containing the generated wavs
var models = ['DOKIMI/det', 'DOKIMI/det_LORA', 'DOKIMI/ground2', 'DOKIMI/llm', 'DOKIMI/llm_spk']
var comp_models = ['SYGKRISI/llm_prompts_speaker', 'SYGKRISI/lora_prompts_speaker', 'SYGKRISI/baseline'] 

// Variable to store all paths for the wavs of the random test
var test_paths = []
var test_wavs_html = []
var t_idx = -1

var comp_paths = []
var comp_paths_2 = []
var comp_wavs_html = []
var c_idx = -1


$.getJSON('static/js/tests.json', function(data) {
    //do stuff with your data here
    console.log("data:", data);
    let surveyJSON = JSON.parse(JSON.stringify(defsurveyJSON));
    
    // Random integer
    // var t_idx = getRndInteger(0,5)


    // NEW CODE TWO AUDIO 
    // Random element from a list
    c_idx = comp_lst[Math.floor(Math.random()*comp_lst.length)];
    console.log("Random test No: ",c_idx);

    
    for (let i=0;i<comp_models.length;i++){
        console.log("Wavs for model ",comp_models[i]);
        let model = comp_models[i];

        console.log(data['comp_array'][i][c_idx]);
        // compare same model diferent index 
        // HERE it takes the next row if you want add 3 rows extra and tell it to take the +3 row 
        mod_t_wav = data['comp_array'][i][c_idx];
        mod_t_wav_2 = data['comp_array'][i+1][c_idx];
        console.log(mod_t_wav)
        console.log(mod_t_wav_2)
        for (let j=0; j<mod_t_wav.length; j++){


            // TODO 
            wav_path_1 = model+'/sentence_'+mod_t_wav[j].toString()+'.wav'
            wav_path_2 = model+'/sentence_'+mod_t_wav_2[j].toString()+'.wav'
            comp_paths.push(wav_path_1);
            comp_paths_2.push(wav_path_2);

            var double_audio_html = 
                `<table style="width:100%">
                <tr>
                    <td style="text-align:center">
                    <audio controls>
                        <source src="${window.location.href}static/wavs/${wav_path_1}" type="audio/wav">
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                    </td>
                    <td style="text-align:center">
                    <audio controls>
                        <source src="${window.location.href}static/wavs/${wav_path_2}" type="audio/wav">
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                    </td>
                </tr>
                </table>`
            comp_wavs_html.push(double_audio_html)
        }
        
    }
    

    arrShuffle(comp_paths, comp_wavs_html);
    console.log(comp_paths);
    console.log(comp_paths_2);
    console.log(comp_wavs_html);

    for (let i=0; i< comp_paths.length; i++){

        idxComp = i + 1;
        idxQ = idxComp

        comparePage = JSON.parse(JSON.stringify(defComparePage));
        comparePage.name = comparePage.name + idxComp;
        comparePage.title = comparePage.title + idxComp;

        new_html = comp_wavs_html[i];

        comparePage.questions[0].html = new_html;
  
        comparePage.questions[0].name = comparePage.questions[0].name + idxQ;
        // idxQ++;
        comparePage.questions[1].name = comparePage.questions[1].name + idxQ;
        // idxQ++;
       
        new_page = JSON.parse(JSON.stringify(comparePage));

        idxPush = i + 2
        surveyJSON.pages.splice(idxPush,0,new_page)
    }


    // OLD CODE ONE AUDIO 
    // Random element from a list
    t_idx = tests_lst[Math.floor(Math.random()*tests_lst.length)];
    console.log("Random test No: ",t_idx);

    
    for (let i=0;i<models.length;i++){
        console.log("Wavs for model ",models[i]);
        let model = models[i];

        console.log(data['test_array'][i][t_idx]);
        mod_t_wav = data['test_array'][i][t_idx];
        console.log(mod_t_wav)
        for (let j=0; j<mod_t_wav.length; j++){
            
            wav_path = model+'/sentence_'+mod_t_wav[j].toString()+'.wav'
            test_paths.push(wav_path);

            wav_html = `<audio controls><source src=\"${window.location.href}static/wavs/${wav_path}\" type=\"audio/wav\"> Your browser does not support the <code>audio</code> element. </audio>`
            test_wavs_html.push(wav_html)
        }
        
    }
    
    arrShuffle(test_paths, test_wavs_html);
    console.log(test_paths);
    console.log(test_wavs_html);

    for (let i=0; i< test_paths.length; i++){
        idxTest = i + 1;
        idxQ = idxTest

        testPage = JSON.parse(JSON.stringify(defTestPage));
        testPage.name = testPage.name + idxTest;
        testPage.title = testPage.title + idxTest;

        new_html = test_wavs_html[i];

        testPage.questions[0].html = new_html;
  
        testPage.questions[0].name = testPage.questions[0].name + idxQ;
        // idxQ++;
        testPage.questions[1].name = testPage.questions[1].name + idxQ;
        // idxQ++;
        testPage.questions[2].name = testPage.questions[2].name + idxQ;
        // idxQ++;
       
        new_page = JSON.parse(JSON.stringify(testPage));

        idxPush = i + 2
        surveyJSON.pages.splice(idxPush,0,new_page)
    }


    // Initialize survey
    var survey = new Survey.Model(surveyJSON);
    $("#surveyContainer").Survey({
        model: survey,
        onComplete: sendDataToServer.bind(this)
    });

});


