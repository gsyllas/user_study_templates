@KOSMAS KRITSIS
Two templates for simple surveys based on Flask and Survey.js libraries.

- pairwise_survey_web_app_demo: Includes direct AB comparisons based on preference.
- ratings_survey_web_app_demo: The testing dimensions are evaluated based on Likert-based scores between 1 and 5.

Install anaconda with python3 and create an environment with python3 and flask server (and any other dependecies required by the system, if any).

Activate the anaconda environment that you created.

To test locally simply run:
$ python app.py

and access from your browser: http://0.0.0.0:portnumber (portnumber specified in app.py)

For server side deployment, it depends on your server setup and network configurations (firwall etc.)


### ADDED FROM vaspapts
```
curl -O https://repo.anaconda.com/archive/Anaconda3-2025.06-0-Linux-x86_64.sh
bash Anaconda3-2025.06-0-Linux-x86_64.sh
pip install flask
pip install natsort

git clone https://github.com/vpapage/user_study_templates.git
conda create -n survey_env python=3.10 -y
conda activate survey_env
python ratings_survey_web_app_demo/app.py >> output.log
```


### Explain -> `test.json`

* Every line is for one model:
if you add 3 models in the model list it needs all the bellow, if you add 4 models it will crash
* Every στηλη is selected randomly, it is the "testN" or "compN".
* Inside the smallest brackets there are the numbers of the wavs that will be used! This means you can choose more wavs from spesific models.
```
{
    "array": [
        # random1 random2  random3
        [[11,11], [12,12], [13,13]], # model1
        [[14,14], [15,15], [16,16]], # model2
        [[17,17], [18,18], [19,19]]  # model3
        ]
    }
```

### HOW TONRUN IT ON AWS VM 

```
   65  cd user_study_templates/
   66  ps aux | grep python 
   67  kill 25067 25068 
   68  git pull 
   69  source venv/bin/activate
   70  nohup python3 ratings_survey_web_app_demo/app.py > app.log 2>&1 &
   71  ps aux | grep python 
```
