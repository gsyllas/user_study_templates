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


ADDED FROM vaspapts
curl -O https://repo.anaconda.com/archive/Anaconda3-2025.06-0-Linux-x86_64.sh
bash Anaconda3-2025.06-0-Linux-x86_64.sh 
pip install flask
pip install natsort

git clone https://github.com/vpapage/user_study_templates.git
python ratings_survey_web_app_demo/app.py >> output.log 
