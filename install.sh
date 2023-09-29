#!/bin/bash
set -e

echo Your project name is: ${PWD##*/}

#  Remove composer
if [[ -f composer.lock ]]
then
	rm composer.lock
fi

if [[ -f composer.json ]]
then
	rm composer.json
fi

#  Remove composer vedor
rm -rf vendor/

if [[ -f install.sh ]]
then
	rm install.sh
fi

if [[ -f starter_frontend_twig.code-workspace ]]
then
	rm starter_frontend_twig.code-workspace
fi

#  Assign the filename
filename="int.code-workspace"
if [[ -f $filename ]]
then
	perl -pi -e "s/int_starter_frontend_twig/${PWD##*/}/g" $filename
	mv $filename ${PWD##*/}.code-workspace
fi
echo Your project was install
