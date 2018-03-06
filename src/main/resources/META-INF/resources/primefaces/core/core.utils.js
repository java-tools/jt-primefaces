if (!PrimeFaces.utils) {

    PrimeFaces.utils = {

        resolveDynamicOverlayContainer: function(widget) {
            return widget.cfg.appendTo
                ? PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(widget.cfg.appendTo)
                : $(document.body);
        },

        /**
         * Removes the overlay from the appendTo overlay container.
         */
        removeDynamicOverlay: function(widget, element, id, appendTo) {
            // if the id contains a ':'
            appendTo.children(PrimeFaces.escapeClientId(id)).not(element).remove();

            // if the id does NOT contain a ':'
            appendTo.children("[id='" + id + "']").not(element).remove();
        },

        appendDynamicOverlay: function(widget, element, id, appendTo) {
            var elementParent = element.parent();

            // skip when the parent currently is already the same
            // this likely happens when the dialog is updated directly instead of a container
            // as our ajax update mechanism just updates by id
            if (!elementParent.is(appendTo)
                    && !appendTo.is(element)) {

                PrimeFaces.utils.removeDynamicOverlay(widget, element, id, appendTo);

                element.appendTo(appendTo);
            }
        },

        addDynamicOverlayModal: function(element, id) {
            var modalId = id + '_modal';

            $(document.body).append('<div id="' + modalId + '" class="ui-widget-overlay ui-dialog-mask"></div>');
            $(document.body).children(PrimeFaces.escapeClientId(modalId)).css('z-index' , element.css('z-index') - 1);
        },

        removeDynamicOverlayModal: function(id) {
            var modalId = id + '_modal';

            // if the id contains a ':'
            $(PrimeFaces.escapeClientId(modalId)).remove();

            // if the id does NOT contain a ':'
            $(document.body).children("[id='" + modalId + "']").remove();
        }




    };

}