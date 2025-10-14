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

sudo ssh -i "vaspapts.pem" ubuntu@ec2-13-48-57-50.eu-north-1.compute.amazonaws.com

```
cd user_study_templates/
ps aux | grep python
kill 25067 25068
git pull
source venv/bin/activate
nohup python3 ratings_survey_web_app_demo/app.py > app.log 2>&1 &
ps aux | grep python
```




vpapageo@l32lxx54-ath:~/syllas/user_study_templates$ python3 analysis/data_scraper.py
📥 Processing: survey_20251006_153947_102e5b.json
📥 Processing: survey_20251012_144507_622d02.json
📥 Processing: survey_20251005_132336_19327d.json
📥 Processing: survey_20251010_054121_620722.json
📥 Processing: survey_20251010_174140_93d6e0.json
📥 Processing: survey_20251010_062929_837b2e.json
📥 Processing: survey_20251007_192259_704a98.json
📥 Processing: survey_20251008_013855_549d28.json
📥 Processing: survey_20251008_091029_bc5bea.json
📥 Processing: survey_20251005_221021_cfe5c5.json
📥 Processing: survey_20251007_172255_ac570d.json
📥 Processing: survey_20251010_054308_2f70aa.json
📥 Processing: survey_20251008_215034_5d5eff.json
📥 Processing: survey_20251009_084320_b1a3de.json
📥 Processing: survey_20251010_193056_946428.json
📥 Processing: survey_20251007_090303_e7ae6b.json
📥 Processing: survey_20251005_135954_eda4dc.json
📥 Processing: survey_20251005_133820_678013.json
📥 Processing: survey_20251007_153918_c4ec7d.json
📥 Processing: survey_20251007_091249_48958b.json
📥 Processing: survey_20251013_200455_308176.json
📥 Processing: survey_20251007_202115_3cff2a.json
📥 Processing: survey_20251010_063746_bcc42f.json
📥 Processing: survey_20251008_060655_6360ec.json
📥 Processing: survey_20251010_134106_88b3af.json
📥 Processing: survey_20251006_153005_9ba333.json
📥 Processing: survey_20251005_131357_f5308b.json
📥 Processing: survey_20251010_130341_298c83.json
📥 Processing: survey_20251007_171218_2d88a2.json

✅ Combined results (with mean & deviation) written to: analysis/ignorants_MOS_results.json
vpapageo@l32lxx54-ath:~/syllas/user_study_templates$ python3 analysis/data_scraper.py
📥 Processing: survey_20251006_153947_102e5b.json
📥 Processing: survey_20251012_144507_622d02.json
📥 Processing: survey_20251005_132336_19327d.json
📥 Processing: survey_20251010_054121_620722.json
📥 Processing: survey_20251010_174140_93d6e0.json
📥 Processing: survey_20251010_062929_837b2e.json
📥 Processing: survey_20251007_192259_704a98.json
📥 Processing: survey_20251008_013855_549d28.json
📥 Processing: survey_20251008_091029_bc5bea.json
📥 Processing: survey_20251005_221021_cfe5c5.json
📥 Processing: survey_20251007_172255_ac570d.json
📥 Processing: survey_20251010_054308_2f70aa.json
📥 Processing: survey_20251008_215034_5d5eff.json
📥 Processing: survey_20251009_084320_b1a3de.json
📥 Processing: survey_20251010_193056_946428.json
📥 Processing: survey_20251007_090303_e7ae6b.json
📥 Processing: survey_20251005_135954_eda4dc.json
📥 Processing: survey_20251005_133820_678013.json
📥 Processing: survey_20251007_153918_c4ec7d.json
📥 Processing: survey_20251007_091249_48958b.json
📥 Processing: survey_20251013_200455_308176.json
📥 Processing: survey_20251007_202115_3cff2a.json
📥 Processing: survey_20251010_063746_bcc42f.json
📥 Processing: survey_20251008_060655_6360ec.json
📥 Processing: survey_20251010_134106_88b3af.json
📥 Processing: survey_20251006_153005_9ba333.json
📥 Processing: survey_20251005_131357_f5308b.json
📥 Processing: survey_20251010_130341_298c83.json
📥 Processing: survey_20251007_171218_2d88a2.json

✅ Combined results (with mean & deviation) written to: analysis/experts_MOS_results.json
vpapageo@l32lxx54-ath:~/syllas/user_study_templates$