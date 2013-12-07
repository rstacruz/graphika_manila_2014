all: archive.zip

public: app
	brunch build

archive.zip: public
	rm -f $@
	cd $< && zip -9r ../$@ . -x .git/

dropbox: archive.zip
	cp $< ~/Dropbox/Public/GM2014.zip

unretina: \
	app/assets/images/bg-ticket-grey.jpg \
	app/assets/images/bg-ticket-red.jpg

app/assets/images/%.jpg: app/assets/images/%@2x.jpg
	convert $< -resize 50% -strip $@

cachebust:
	perl -p -i -e "s/\?v=[0-9]+/?v=`echo $$RANDOM`/" app/assets/index.html

.PHONY: unretina dropbox all cachebust
