define(['configs/app'], function (app) {
	'use strict';
		app.register.directive( 'treeModel', ['$compile', '$state', function( $compile, $state ) {
			return {
				restrict: 'A',
				link: function ( scope, element, attrs) {
					//tree id
					var treeId = attrs.treeId;
					//tree model
					var treeModel = attrs.treeModel;
					//node id
					var nodeId = attrs.nodeId || 'id';
					//node label
					var nodeLabel = nodeId;
					//children
					var nodeChildren = attrs.nodeChildren || 'children';
					var actions = attrs.treeActions;
					var onClick = attrs.nodeClick;
					//tree template
					var template =
						'<ul>' +
						'<li ng-repeat="node in ' + treeModel + '">' +
						'<i class="fa fa-folder collapsed " data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
						'<i class="fa fa-folder-open-o expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
						'<i class="fa fa-file-code-o normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
						'<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}} </span>' +
						'<a ng-repeat="	item in ' + actions +'" data-ng-class="node.actions" class="an" data-ng-click="applytreeActions(item, node)"><i class="{{item.icon}}"> </i> </a>'+
						'<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + ' data-tree-actions=' + actions + '></div>' +
						'</li>' +
						'</ul>';

					//check tree id, tree model
					if( treeId && treeModel ) {
						//root node
						if (attrs.angularTreeview) {
							//create tree object if not exists
							scope[treeId] = scope[treeId] || {};
							//if node head clicks,
							scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {
									//Collapse or Expand
									selectedNode.collapsed = !selectedNode.collapsed;
								};
							//if node label clicks,
							scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {
									//remove highlight from previous node
									if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
										scope[treeId].currentNode.selected = undefined;
										scope[treeId].currentNode.actions = undefined;
									}
									//set highlight to selected node
									selectedNode.selected = 'selected';
									selectedNode.actions = 'actions';
									//set currentNode
									scope[treeId].currentNode = selectedNode;
									scope[onClick](selectedNode);
								};
						}
					}
					//Rendering template.
					element.html('').append( $compile( template )( scope ) );
				}
			}
		}]);
});

