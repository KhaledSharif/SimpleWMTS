var run = function() {
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    var selector = document.getElementById('navbarSupportedContent');
    fetch('getLayers').then(function(response) {
        return response.json();
    }).then(function(data) {
        Window.layerName = data[0].name;
        for (var geotiff in data) {
           selector.appendChild(htmlToElement(
                '<button type="button" value="' +
                data[geotiff].name +
                '" class="btn btn-secondary">' +
                data[geotiff].name +
                '</button>'
           ));
        }
        Window.layerChanged();
        Array.from(selector.children).forEach(function (element) {
            element.onclick = function()
            {
                Window.layerName = this.value;
                Window.layerChanged();
            };
        });
    });
};

exports.run = run;