(function() {
	
	// Base template
	var base_tpl =
			"<!doctype html>\n" +
			"<html>\n\t" +
      "<head>\n\t\t" +
      "<meta charset=\"utf-8\">\n\t\t" +
      "<title>Site</title>\n\n\t\t\n\t" +
      "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css\">" +
      "<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js\"></script>" +
      "</head>\n\t" +
      "<body>\n\t\n\t" +
      "</body>\n" +
      "</html>";
	
	var prepareSource = function() {
		var html = html_editor.getValue(),
				css = css_editor.getValue(),
				js = js_editor.getValue(),
				src = '';
		
		// HTML
		src = base_tpl.replace('</body>', html + '</body>');
		
		// CSS
		css = '<style>' + css + '</style>';
		src = src.replace('</head>', css + '</head>');
		
		// Javascript
		js = '<script>' + js + '<\/script>';
		src = src.replace('</body>', js + '</body>');
		
		return src;
	};
	
	var render = function() {
		var source = prepareSource();
		
		var iframe = document.querySelector('#output iframe'),
				iframe_doc = iframe.contentDocument;
		
		iframe_doc.open();
		iframe_doc.write(source);
		iframe_doc.close();
	};
	
	
	// EDITORS
	
	// CM OPTIONS
	var cm_opt = {
		mode: 'htmlmixed',
		gutter: true,
		lineNumbers: true,
		dragDrop: true,
		cursorBlinkRate: 300
	};
	
	// HTML EDITOR
	var html_box = document.querySelector('#html textarea');
	var html_editor = CodeMirror.fromTextArea(html_box, cm_opt);

  html_editor.on('change', function (inst, changes) {
    render();
  });
	
	// CSS EDITOR
	cm_opt.mode = 'css';
	var css_box = document.querySelector('#css textarea');
	var css_editor = CodeMirror.fromTextArea(css_box, cm_opt);
  
  css_editor.on('change', function (inst, changes) {
    render();
  });
	
	// JAVASCRIPT EDITOR
	cm_opt.mode = 'javascript';
	var js_box = document.querySelector('#js textarea');
	var js_editor = CodeMirror.fromTextArea(js_box, cm_opt);
  
  js_editor.on('change', function (inst, changes) {
    render();
  });
	
	// SETTING CODE EDITORS INITIAL CONTENT
	html_editor.setValue('<h1>Hello Universe</h1>');
	css_editor.setValue('body { color: blue; }');
	
	
	// RENDER CALL ON PAGE LOAD
	// NOT NEEDED ANYMORE, SINCE WE RELY
	// ON CODEMIRROR'S onChange OPTION THAT GETS
	// TRIGGERED ON setValue
	// render();
	
	
	// NOT SO IMPORTANT - IF YOU NEED TO DO THIS
	// THEN THIS SHOULD GO TO CSS
	
	/*
		Fixing the Height of CodeMirror.
		You might want to do this in CSS instead
		of JS and override the styles from the main
		codemirror.css
	*/
	var cms = document.querySelectorAll('.CodeMirror');
	for (var i = 0; i < cms.length; i++) {
		
		cms[i].style.position = 'absolute';
		cms[i].style.top = '30px';
		cms[i].style.bottom = '0';
		cms[i].style.left = '0';
		cms[i].style.right = '0';
    cms[i].style.height = '100%';
	}
	cms = document.querySelectorAll('.CodeMirror-scroll');
	for (i = 0; i < cms.length; i++) {
		cms[i].style.height = '100%';
	}
			
}());
