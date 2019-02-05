import treeherder from '../treeherder';

treeherder.component('loading', {
    bindings: {
        data: '<',
    },
    template: `
        <div ng-if="$ctrl.data" class="overlay">
            <div>
                <span class="fas fa-spinner fa-pulse th-spinner-lg"></span>
            </div>        
        </div>
    `,
});
