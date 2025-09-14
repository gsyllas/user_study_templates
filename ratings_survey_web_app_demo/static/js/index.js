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

    dataJSON = {}

    // Get the answers
    dataJSON.answers = sender.data

    // Get the order of the questions
    dataJSON.survey = test_paths

    // Get the test number
    dataJSON.testN = t_idx
    
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
    title: " Νευρωνική Σύνθεση Ομιλίας - TTS ", // Translated
    description: " Δοκιμή για την αξιολόγηση της απόδοσης συστημάτων νευρωνικής σύνθεσης ομιλίας ", // Translated
    pages: [
        {
            name: "Intro",
            elements: [
                {
                    type: "html",
                    name: "Info",
                    html: "<p>Η έρευνα περιλαμβάνει 25 δοκιμές, όπου κάθε δοκιμή παρουσιάζει ένα ηχητικό κλιπ ομιλίας διάρκειας έως 10 δευτερόλεπτα.\n</p>\n\n<p>Στη συνέχεια, ο αξιολογητής καλείται να βαθμολογήσει τη φυσικότητα της ομιλίας του δοθέντος ηχητικού κλιπ σε κλίμακα Likert από 1 έως 5, όπου το 1 υποδηλώνει \"μη-ομιλία\" και το 5 \"εντελώς φυσική ομιλία\" .\n</p>\n\n\n<br>\n<br>\n<br>\n============================\n<p>\n<strong>Απαιτούμενος Περιηγητής:</strong> Firefox, Chrome, Safari\n</p>\n<p>\n<strong>Εκτιμώμενος χρόνος ολοκλήρωσης της έρευνας:</strong> 10 έως 15 λεπτά\n</p>\n\n<p> <strong>Για ερωτήσεις επικοινωνήστε με:</strong> <a href=\"mailto:syllasgiorgos@gmail.com\">syllasgiorgos@gmail.com</a> \n</p>" // Translated
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
                            text: "-20"
                        },
                        {
                            value: "item2",
                            text: "20-30"
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
                        }
                    ],
                    hasOther: false
                },
                {
                    type: "rating",
                    name: "question3",
                    title: "Είστε εξοικειωμένοι με τη Μηχανική Μάθηση και την Τεχνητή Νοημοσύνη;", // Translated
                    isRequired: true,
                    minRateDescription: "Ερασιτέχνης", // Translated
                    maxRateDescription: "Ειδικός" // Translated
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
                    title: "Θα χαρούμε να λάβουμε την ανατροφοδότησή σας. (προαιρετικό)", // Translated
                    hideNumber: true
                }
            ],
            title: "Ανατροφοδότηση", // Translated
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
            name: "question1-",
            title: "Παρακαλώ βαθμολογήστε τη φυσικότητα της ομιλίας:", // Translated
            isRequired: true,
            rateMin: 1,
            rateMax: 5,
            rateStep: 0.5,
            minRateDescription: "Δεν βγαίνει νόημα", // Translated
            maxRateDescription: "Εντελώς φυσική" // Translated
        }
    ],
    title: "Δοκιμή ", // Translated
    description: " Παρακαλώ ακούστε το ηχητικό κλιπ και απαντήστε στην ερώτηση." // Translated
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
            title: "Παρακαλώ συγκρίνετε την πρωτότυπη με την παραγόμενη πρόταση, και βαθμολογίστε την ομοιότητα τους:", 
            isRequired: true,
            rateMin: 1,
            rateMax: 5,
            rateStep: 0.5,
            minRateDescription: "Καμία ομοιότητα",
            maxRateDescription: "Το ίδιο ακριβώς"
        }
    ],
    title: "Σύγκριση ",
    description: "Ακούστε τα δύο κλιπ και βαθμολογήστε την ομοιότητα."
};




// We declare which test we want to make as random choice for presenting to user
// Each test contains random ids corresponding to the wav files.
// tests_lst = [3,4,5] -> e.g. if we want to choose between test 3,4,5
// In total we have 6 tests
// var tests_lst = [0,1,2,3,4,5];
// var tests_lst = [0,2,4,5];
var tests_lst = [0,2];

// We declare the name of the models. Must match the name of the folders containing the generated wavs
var models = ['deterministic_50_epochs', 'deterministic_finetuned_speaker1']

// Variable to store all paths for the wavs of the random test
var test_paths = []
var test_wavs_html = []
var t_idx = -1


$.getJSON('static/js/tests.json', function(data) {
    //do stuff with your data here
    console.log("data:", data);
    let surveyJSON = JSON.parse(JSON.stringify(defsurveyJSON));
    
    // Random integer
    // var t_idx = getRndInteger(0,5)

    // OLD CODE ONE AUDIO 
    // Random element from a list
    t_idx = tests_lst[Math.floor(Math.random()*tests_lst.length)];
    console.log("Random test No: ",t_idx);

    
    for (let i=0;i<models.length;i++){
        console.log("Wavs for model ",models[i]);
        let model = models[i];

        console.log(data['array'][i][t_idx]);
        mod_t_wav = data['array'][i][t_idx];
        console.log(mod_t_wav)
        for (let j=0; j<mod_t_wav.length; j++){
            
            wav_path = model+'/'+mod_t_wav[j].toString()+'.wav'
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
       
        new_page = JSON.parse(JSON.stringify(testPage));

        idxPush = i + 2
        surveyJSON.pages.splice(idxPush,0,new_page)
    }

    // NEW CODE TWO AUDIO 
    // Random element from a list XAXAXXAX
    t_idx = tests_lst[Math.floor(Math.random()*tests_lst.length)];
    console.log("Random test No: ",t_idx);

    
    for (let i=0;i<models.length;i++){
        console.log("Wavs for model ",models[i]);
        let model = models[i];

        console.log(data['array'][i][t_idx]);
        mod_t_wav = data['array'][i][t_idx];
        console.log(mod_t_wav)
        for (let j=0; j<mod_t_wav.length; j++){
            
            wav_path = model+'/'+mod_t_wav[j].toString()+'.wav'
            test_paths.push(wav_path);

            // wav_html = `<audio controls><source src=\"${window.location.href}static/wavs/${wav_path}\" type=\"audio/wav\"> Your browser does not support the <code>audio</code> element. </audio>`
            var double_audio_html = 
                `<table style="width:100%">
                <tr>
                    <th style="text-align:center">Original</th>
                    <th style="text-align:center">Generated</th>
                </tr> 
                <tr>
                    <td style="text-align:center">
                    <audio controls>
                        <source src="${window.location.href}static/wavs/${wav_path}" type="audio/wav">
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                    </td>
                    <td style="text-align:center">
                    <audio controls>
                        <source src="${window.location.href}static/wavs/${wav_path}" type="audio/wav">
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                    </td>
                </tr>
                </table>`
            test_wavs_html.push(double_audio_html)
        }
        
    }
    

    arrShuffle(test_paths, test_wavs_html);
    console.log(test_paths);
    console.log(test_wavs_html);

    for (let i=0; i< test_paths.length; i++){

        idxTest = i + 1;
        idxQ = idxTest

        comparePage = JSON.parse(JSON.stringify(defComparePage));
        comparePage.name = comparePage.name + idxTest;
        comparePage.title = comparePage.title + idxTest;

        new_html = test_wavs_html[i];

        comparePage.questions[0].html = new_html;
  
        comparePage.questions[0].name = comparePage.questions[0].name + idxQ;
        // idxQ++;
        comparePage.questions[1].name = comparePage.questions[1].name + idxQ;
        // idxQ++;
       
        new_page = JSON.parse(JSON.stringify(comparePage));

        idxPush = i + 2
        surveyJSON.pages.splice(idxPush,0,new_page)
    }


    // // TODO 2 wavs for comarison part
    // for (let j=0; j< test_paths.length; j++){

    //     idxTest = j + 1;
    //     idxQ = idxTest

    //     comparePage = JSON.parse(JSON.stringify(defComparePage));
    //     comparePage.name = comparePage.name + idxTest;
    //     comparePage.title = comparePage.title + idxTest;

    //     new_html = test_wavs_html[j];

    //     comparePage.questions[0].html = new_html;

    //     // Insert 2 audios
    //     comparePage.questions[0].html = test_wavs_html[j];
    //     comparePage.questions[0].name = comparePage.questions[0].name + idxQ + "_1";

    //     comparePage.questions[1].name = comparePage.questions[1].name + idxQ + "_2";
        
    //     // Rating question name
    //     comparePage.questions[2].name = comparePage.questions[2].name + idxQ; 

    //     new_compare_page = JSON.parse(JSON.stringify(comparePage));

    //     idxPush = j + 2
    //     surveyJSON.pages.splice(idxPush,0,new_compare_page)

    // }


    // Initialize survey
    var survey = new Survey.Model(surveyJSON);
    $("#surveyContainer").Survey({
        model: survey,
        onComplete: sendDataToServer.bind(this)
    });

});


