document.addEventListener('DOMContentLoaded', function() {
    var addHaveButton = document.querySelector('#addHave');
    var addNeedButton = document.querySelector('#addNeed');
    var input = document.querySelector('input[type=text][name=item]');
    var uls = document.querySelectorAll('ul');

    function addItem(event) {
        event.preventDefault();
        var value = input.value.trim();
        var need = event.target.id === 'addNeed';
        var item = document.createElement('li');
        var checkbox = document.createElement('input');
        var label = document.createTextNode(value);
        var clearLink = document.createElement('a');
        var list = need ? uls[0] : uls[uls.length - 1];

        if (value === '') {
            return;
        }

        checkbox.type = 'checkbox';
        checkbox.name = 'item';
        item.appendChild(checkbox);
        item.appendChild(label);
        clearLink.href = '#';
        clearLink.textContent = 'clear';
        clearLink.addEventListener('click', function(event) {
            event.preventDefault();
            item.remove();
        });
        item.appendChild(clearLink);
        input.value = '';
        input.focus();

        if (!need) {
            checkbox.checked = true;
        }

        list.appendChild(item);
    }

    addHaveButton.addEventListener('click', addItem);
    addNeedButton.addEventListener('click', addItem);

    for (var i = 0; i < uls.length; i++) {
        uls[i].addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                event.target.parentElement.remove();
            } else if (event.target.type === 'checkbox') {
                var listItem = event.target.parentElement;
                var list = event.target.checked ? uls[uls.length - 1] : uls[0];
                list.appendChild(listItem);
            }
        });
    }
});