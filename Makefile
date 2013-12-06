all: archive.zip

public: app
	brunch build

archive.zip: public
	rm -f $@
	cd $< && zip -9r ../$@ . -x .git/
