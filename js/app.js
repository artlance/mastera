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

    $(document).on('click', '.panel-back, .panel-mask', function (event) {
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

});//document ready