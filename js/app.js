$(document).ready(function () {

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //navigation mobile
    $(document).on('click', '.navigation-toggle', function (event) {
        event.preventDefault();
        $('body').toggleClass('navigation-open');
    });

    //-----------------------------------------//

    //navigation sidebar
    $(document).on('click', '.sidebar-navigation-drop', function (event) {
        event.preventDefault();
        $(this).parents('li').toggleClass('opened');
    });

    //-----------------------------------------//

    //toggle active
    $(document).on('click', '.toggle-active li:not(.active)', function (event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');

        var thisTarget = $(this).find('a').data('target');
        if (thisTarget) {
            $('[data-toggleTarget="' + thisTarget + '"]')
                .removeClass('hidden')
                .siblings('.data-target')
                .addClass('hidden');
        }
    });

    //-----------------------------------------//

    //drop
    activePop = null;
    function closeInactivePop() {
        $('.drop').each(function (index) {
            if ($(this).hasClass('open') && index != activePop) {
                $(this).removeClass('open');
            }
        });
        return false;
    }
    $(document).on('mouseover', '.drop', function () {
        activePop = $('.drop').index(this);
    });
    $(document).on('mouseout', '.drop', function () {
        activePop = null;
    });
    $(document.body).on('click', function (event) {
        closeInactivePop();
    });
    $(document).on('click', '.drop-toggle', function (event) {
        event.preventDefault();
        $(this).parent('.drop').toggleClass('open');
    });

    //-----------------------------------------//

    //maxlength
    $(document).on('keydown keyup keypress', '.symbols-maxlength', function () {
        var thisValue = $(this).val(),
            currentText = $(this).parents('.input-wrapper').find('.symbols-maxlength-current');
        if (thisValue.length) {
            currentText.text(thisValue.length);
        } else {
            currentText.text('0');
        }
    });

    //-----------------------------------------//

    //drag file
    $('.drag-file .drag-file-input').on('change', function (event) {
        var thisElement = $(this),
            thisParent = thisElement.parents('.drag-file'),
            thisValue = thisElement.val();
        if (thisValue) {
            thisParent.addClass('active');
        } else {
            thisParent.removeClass('active');
        }

        var thisFiles = event.target.files,
            thisFilesArr = [];

        for (var i = thisFiles.length - 1; i >= 0; i--) {
            thisFilesArr.push(thisFiles[i].name);
        }
        thisFilesArr = thisFilesArr.toString().replace(/,/g, '<br>');

        thisParent.find('.drag-file-value').html(thisFilesArr);
    });

    $('.drag-file-input').on('dragenter dragover', function (event) {
        $(this).parents('.drag-file').addClass('dragover');
    });
    $('.drag-file-input').on('dragleave change drop', function (event) {
        $(this).parents('.drag-file').removeClass('dragover');
    });

    //-----------------------------------------//

    //program settings
    $(document).on('click', '.program-header-settings-button-settings', function (event) {
        event.preventDefault();
        $('.program-settings').addClass('show');
    });

    $(document).on('click', '.program-settings-close, .program-settings-back', function (event) {
        event.preventDefault();
        $('.program-settings').removeClass('show');
    });

    //-----------------------------------------//

    //modal attachment
    $(document).on('click', '.program-sidebar-attachments-add, .program-content-add-button', function (event) {
        event.preventDefault();
        $('html').addClass('modal-show');
        $('.modal-mask').fadeIn('200');
        $('#modal-attachment').fadeIn('200');
    });

    function closeAllModals() {
        $('html').removeClass('modal-show');
        $('.modal-mask').fadeOut('200');
        $('.modal').fadeOut('200');
    }

    $(document).on('click', '.modal-close, .modal-mask', function (event) {
        event.preventDefault();
        closeAllModals();
    });

    //-----------------------------------------//

    //panel
    $(document).on('click', '.panel-toggle', function (event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-panel="' + thisId + '"]').addClass('show');
        $('html').addClass('panel-show');
    });

    $(document).on('click', '.panel-back, .panel-mask, .panel-close', function (event) {
        event.preventDefault();
        $('.panel').each(function (index, el) {
            $(el).removeClass('show');
        });
        $('html').removeClass('panel-show');
    });

    //-----------------------------------------//

    //program sidebar category
    $(document).on('click', '.program-sidebar-category-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.program-sidebar-category').toggleClass('open');
    });

    $(document).on('click', '.program-sidebar-category-edit', function (event) {
        event.preventDefault();
        var thisParents = $(this).parents('.program-sidebar-category');
        var thisInput = thisParents.find('.program-sidebar-category-caption-text');
        thisInput.removeClass('readonly').attr('readonly', false).focus();
        var thisInputVal = thisInput.val();
        thisInput.val('').val(thisInputVal);
        activePop = null;
        closeInactivePop();
    });

    $(document).on('focusout', '.program-sidebar-category-caption-text', function (event) {
        $(this).addClass('readonly').attr('readonly', true);
    });
    $(document).on('keypress', '.program-sidebar-category-caption-text', function (event) {
        var thisElement = $(this);
        if (event.which == 13) {
            thisElement.addClass('readonly').attr('readonly', true);
        }
    });

    //modal new category
    $(document).on('click', '.program-sidebar-categories-add', function (event) {
        event.preventDefault();
        $('html').addClass('modal-show');
        $('.modal-mask').fadeIn('200');
        $('#modal-new-category').fadeIn('200', function () {
            $('#modal-category-name').focus();
        });
    });

    $(document).on('click', '#modal-new-category-add', function (event) {
        event.preventDefault();
        var templateName = $('#modal-category-name').val();
        var templateNewCategory = $('#template-new-category').html();
        templateNewCategory = templateNewCategory.replace('value="Category name"', 'value="' + templateName + '"');
        $(templateNewCategory).appendTo('.program-sidebar-categories');
        closeAllModals();
        $('#modal-category-name').val('');
        $('#modal-category-name').parents('.input-wrapper').find('.symbols-maxlength-current').text('0');
    });

    //program sidebar attachments sortable
    $('.program-sidebar-categories .program-sidebar-attachments').sortable({
        placeholder: "ui-state-highlight"
    });

    //-----------------------------------------//

    //program sidebar attachments edit
    $(document).on('click', '.program-sidebar-attachments-edit', function (event) {
        event.preventDefault();
        var thisParents = $(this).parents('a');
        var thisInput = thisParents.find('.program-sidebar-attachments-input');
        thisInput.removeClass('readonly').attr('readonly', false).focus();
        var thisInputVal = thisInput.val();
        thisInput.val('').val(thisInputVal);
    });

    $(document).on('focusout', '.program-sidebar-attachments-input', function (event) {
        $(this).addClass('readonly').attr('readonly', true);
    });
    $(document).on('keypress', '.program-sidebar-attachments-input', function (event) {
        var thisElement = $(this);
        if (event.which == 13) {
            thisElement.addClass('readonly').attr('readonly', true);
        }
    });

    //-----------------------------------------//

    //program content back
    $(document).on('click', '.program-content-back', function (event) {
        event.preventDefault();
        $('.program-content').removeClass('show');
    });

    //-----------------------------------------//

    //customer profile back
    $(document).on('click', '.customer-profile-back', function (event) {
        event.preventDefault();
        $('.customer-profile-content').removeClass('show');
    });

    //-----------------------------------------//

    $(document).on('click', '.program-quiz-input-row-check', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //-----------------------------------------//

    //tab
    $('.tabs').delegate('li:not(.active)', 'click', function () { $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250); });

    //-----------------------------------------//

    //upload file
    $(document).on('click', '.upload-file-list-item-remove', function (event) {
        event.preventDefault();
        $(this).parents('.upload-file-list-item').fadeOut(150);
        $(this).parents('.upload-file').find('.upload-file-input').val('').trigger('change');
    });

    $(document).on('change', '.upload-file-input', function (event) {
        var thisPullTarget = $(this).data('pull');
        var thisPull = $('[data-pull-list="' + thisPullTarget + '"]');
        var thisTemplate = $('.upload-file-template').html();
        if (thisPull.length) {
            thisPull.html('');
            var files = $(this)[0].files;
            for (var i = 0; i < files.length; i++) {
                var fileHTML = $(thisTemplate);
                if (window.File && window.FileList && fileHTML.hasClass('upload-file-list-item-vs-image')) {
                    console.log("File supported browser");
                    var pReader = new FileReader();
                    pReader.addEventListener("load", function (e) {
                        var pic = e.target;
                        fileHTML.css('background-image', 'url(' + pic.result + ')');
                    });
                    pReader.readAsDataURL(files[i]);
                }
                fileHTML.find('.upload-file-list-item-name').text(files[i].name);
                fileHTML.find('.upload-file-list-item-size').text(parseInt(files[i].size / 1024) + ' Kb');
                thisPull.append(fileHTML);
            }
        }
    });

    //-----------------------------------------//

    //program video existing
    $(document).on('click', '.program-video-existing-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.program-video-existing-select').toggleClass('active');
        $('.mobile-existing-video').toggleClass('show');
    });

    $(document).on('click', '.program-video-existing-panel-back', function (event) {
        event.preventDefault();
        $('.program-video-existing-select').removeClass('active');
        $('.mobile-existing-video').removeClass('show');
    });

    //-----------------------------------------//

    //program video existing choose
    $(document).on('click', '.program-video-existing-category-link', function (event) {
        event.preventDefault();
        $(this).parents('.program-video-existing-panel').find('.program-video-existing-category-list li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    //-----------------------------------------//

    //availability settings
    $(document).on('click', '.program-video-availability-button', function (event) {
        event.preventDefault();
        $('.availability-settings-modal').addClass('show');
    });

    $(document).on('click', '.program-live-class-add', function (event) {
        event.preventDefault();
        $('.add-a-slot-modal').addClass('show');
    });

    $(document).on('click', '.availability-settings-close, .availability-settings-back', function (event) {
        event.preventDefault();
        $('.availability-settings').removeClass('show');
    });

    //-----------------------------------------//

    //datepicker
    $('.mask-date').mask('99.99.9999', { placeholder: 'mm.dd.yyyy' });
    $('.datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "mm.dd.yy",
    });

    //-----------------------------------------//

    //phone mask
    $('.mask-phone').mask('+1 999 999 99 99', { placeholder: '+1 ___ ___ __ __' });

    //-----------------------------------------//

    //availability settings option
    $(document).on('click', '.availability-settings-option', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //-----------------------------------------//

    //schedule toggle
    $(document).on('click', '.program-schedule-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.program-schedule-item').toggleClass('active');
    });

    //-----------------------------------------//

    $('.quiz-question-list').sortable({
        //placeholder: "ui-state-highlight"
        connectWith: ".quiz-question-item",
        handle: ".quiz-question-dragg",
        placeholder: "quiz-placeholder"
    });

    //-----------------------------------------//

    //program conversation hide
    $(document).on('click', '.program-profile-conversation-hide', function (event) {
        event.preventDefault();
        $(this).parents('.program-profile-conversation').toggleClass('program-profile-conversation-hidden');
    });

    //-----------------------------------------//

    //program conversation answer hide
    $(document).on('click', '.program-profile-conversation-answer-hide', function (event) {
        event.preventDefault();
        $(this).parents('.program-profile-conversation-answer').toggleClass('program-profile-conversation-answer-hidden');
    });

    //-----------------------------------------//

    //program profile quiz toggle
    $(document).on('click', '.program-profile-quiz-caption-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.program-profile-quiz-item').toggleClass('open');
    });

    //-----------------------------------------//

    //program profile quiz panel
    $(document).on('click', '.program-profile-quiz-user', function (event) {
        event.preventDefault();
        $('.program-profile-quiz-panel').addClass('show');
    });

    $(document).on('click', '.program-profile-quiz-panel-close, .program-profile-quiz-panel-back', function (event) {
        event.preventDefault();
        $('.program-profile-quiz-panel').removeClass('show');
    });

    //-----------------------------------------//

    const chartColors1 = ['#3A66ED', '#F5717A', '#FBC563', '#99DC13', '#DFDFDF'],
        chartColors2 = ['#3F68E5', '#7994EB', '#8CA3EE', '#B2C2F4', '#C7D4FB'];

    const getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');

        if (!listContainer) {
            listContainer = document.createElement('ul');

            legendContainer.appendChild(listContainer);
        }

        return listContainer;
    };

    const htmlLegendPlugin = {
        id: 'htmlLegend',
        afterUpdate(chart, args, options) {
            const ul = getOrCreateLegendList(chart, options.containerID);
            ul.classList.add('chart-legend-ul');

            // Remove old legend items
            while (ul.firstChild) {
                ul.firstChild.remove();
            }

            // Reuse the built-in legendItems generator
            const items = chart.options.plugins.legend.labels.generateLabels(chart);

            items.forEach((item, index) => {
                const li = document.createElement('li');

                li.onclick = () => {
                    const { type } = chart.config;
                    if (type === 'pie' || type === 'doughnut') {
                        // Pie and doughnut charts only have a single dataset and visibility is per item
                        chart.toggleDataVisibility(item.index);
                    } else {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                    }
                    chart.update();
                };

                // Color box
                const boxSpan = document.createElement('span');
                boxSpan.classList.add('chart-legend-icon');
                boxSpan.style.background = item.fillStyle;
                boxSpan.style.borderColor = item.strokeStyle;
                boxSpan.style.borderWidth = item.lineWidth + 'px';

                // Text
                const textContainer = document.createElement('p');
                textContainer.style.color = item.fontColor;
                textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

                const text = document.createElement('span');
                text.innerHTML = '<span class="chart-legend-label">' + item.text + '</span><span class="chart-legend-value"> ' + chart.data.datasets[0].data[index] + '</span>';
                textContainer.appendChild(text);

                li.appendChild(boxSpan);
                li.appendChild(textContainer);
                ul.appendChild(li);
            });
        }
    };

    if ($('#chart-profile-trend').length) {

        var chart = document.getElementById('chart-profile-trend').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Enrolls',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Earnings',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F6C161',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F6C161',
                fill: true,
                data: [0, 30, 90, 100, 52, 30, 18, 60, 80],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    //

    if ($('#chart-program-age-distribution').length) {

        var chart = document.getElementById('chart-program-age-distribution').getContext('2d');

        var data = {
            labels: ['20s', '30s', '40s', '50s', '60+'],
            datasets: [
                {
                    data: [25, 20, 20, 20, 15],
                    label: '',
                    backgroundColor: ['#3A66ED', '#F5717A', '#FBC563', '#99DC13', '#DFDFDF'],
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-program-age-distribution',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    //

    if ($('#chart-program-gender-distribution').length) {

        var chart = document.getElementById('chart-program-gender-distribution').getContext('2d');

        var data = {
            labels: ['Women', 'Men'],
            datasets: [
                {
                    data: [25, 250],
                    label: '',
                    backgroundColor: ['#F5717A', '#3F68E5'],
                    borderWidth: 0,
                    pointStyle: 'cross',
                }
            ]
        };

        var options = {
            cutout: '65%',
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-program-gender-distribution',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    //

    if ($('#chart-program-course-completion').length) {

        var chart = document.getElementById('chart-program-course-completion').getContext('2d');

        var data = {
            labels: ['1 week', '2 weeks', '3 weeks', '4 weeks'],
            datasets: [
                {
                    data: [25, 20, 20, 20],
                    label: '',
                    backgroundColor: ['#3A66ED', '#F5717A', '#FBC563', '#DFDFDF', '#99DC13'],
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            cutout: '90%',
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-program-course-completion',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    //-----------------------------------------//

    //tags
    $(document).on('keydown', '.tags-new-input', function (event) {
        if (event.which == 13) {
            var thisValue = $(this).val();
            if (thisValue != '') {
                var thisParent = $(this).parents('.tags-wrapper');
                $('<div class="tags-item">' + thisValue + '<a href="#" class="tags-item-delete"><i class="far fa-times"></i></a></div>').appendTo(thisParent.find('.tags-pull'));
                $(this).val('');
            }
        }
    });

    $(document).on('click', '.tags-item-delete', function (event) {
        event.preventDefault();
        $(this).parents('.tags-item').fadeOut('150', function () {
            $(this).remove();
        });
    });

    //-----------------------------------------//

});//document ready