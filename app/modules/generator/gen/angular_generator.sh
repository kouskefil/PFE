#!/bin/bash


function classmaker {
    local  class=`echo $1 | jq -r '.class'`
    local  style=`echo $1 | jq -r '.style'`
    local   dc=`echo $1 | jq -r '.dynamic_class'`
    local nclass
    #echo "classmaker: $1 class: $class"
    if [ "$style" != "null" ]; then
	echo -n " style=\"$style\" " >> $2
    fi

    if [ "$class" != "null" ]; then
	if [ $dc == true ]; then
	    if [ $3 != null ]; then
		nclass=`echo {{$3.$class}}`
	    else
		nclass=`echo {{$class}}`
	    fi
	else
	    nclass=$class
	fi

	echo -n " class=\"$nclass\"" >> $2
    fi

}


function classmaker2 {
    local    class=`echo $1 | jq -r '.class'`
    local    style=`echo $1 | jq -r '.style'`
    #echo "classmaker: $1 class: $class"
    if [ "$style" != "null" ]; then
	echo -n " style=\"$style\"" >> $2
    fi

    if [ "$class" != "null" ]; then
	echo -n "$class" >> $2
    fi

}


function component_label {

    local    label=`echo $1 | jq -r '.label'`
    local    id=`echo $1 | jq -r '.id'`
    local    required=`echo $1 | jq -r '.required'`


    if [  $required == true  ]; then

        if [ "$label" != null ]; then
            echo "<label class=\"control-label\" for=\"$id\">$label" >>$2
            echo "<span class=\"required\" aria-required=\"true\"> * </span>" >> $2
            echo "</label>" >> $2
        fi
    else

        if [ "$label" != null ]; then
            echo "<label for=\"$id\">$label</label>" >> $2
        fi

    fi
}

function hr {
    echo '<hr/>' >> $2
}

function input {

    local    label=`echo $1 | jq -r '.label'`
    local    id=`echo $1 | jq -r '.id'`
    local    name=`echo $1 | jq -r '.name'`
    local    ronly=`echo $1 | jq -r '.ronly'`
    local    model=`echo $1 | jq -r '.model'`
    local    class=`echo $1 | jq -r '.class'`
    local    height=`echo $1 | jq -r '.height'`
    local    required=`echo $1 | jq -r '.required'`
    local    type=`echo $1 | jq -r '.selectedtype'`
    local    style=`echo $1 | jq -r '.style'`
    local selectedtype=`echo $1 | jq -r '.selectedtype'`
    echo "------------------------------------------------------------−−−−−−−−−−> $id : $name"

    if [ "$name" == "null" ]; then
	name=$label
    fi

    echo -n "<div "  >> $2
    classmaker "$1" $2 $3

#    if [ "$class" == "null" ]; then
	if [ "$type" != "checkbox" ]; then
	    echo -n "class=\"form-group\"" >> $2
	fi
	echo ">" >>$2
#    fi


    component_label "$1" $2 $3

    if [ $ronly == true ]; then
        echo "<p>{{$model}}</p>"  >> $2
    else
        echo -n "<input class=\" " >> $2
	if [ $type != "checkbox" ]; then
	    echo -n "form-control" >> $2
	fi
        case $height in
            "small") echo -n " input-sm\" " >> $2
                ;;
            "large") echo -n " input-lg\" " >> $2
                ;;
            *)   echo -n "\" " >> $2
                ;;
        esac;
       
       # if [ $selectedtype == "text" ]; then
            echo -n " placeholder=\"$name\"" >> $2
	   
       # fi
        echo " name=\"$id\" id=\"$id\" type=\"$selectedtype\" ng-model=\"$model\"/>" >> $2
    fi


    echo "</div> <!-- div id:$id -->"  >> $2
}
function dropdown {
   local    id=`echo $1 | jq -r '.id'`
  local    attrs=`echo $1 | jq -r '.otherAttr'`

    echo  "<script type=\"text/ng-template\" id=\"$id.html\">" >> $2
    echo -n "<div class=\"dropdown-menu " >> $2
    classmaker2 "$1" $2 $3
    echo -n "\"" >> $2
    if [ "$attrs" != "null" ]; then
        echo " $attrs" >> $2
    fi
    echo  ">"  >> $2

     foreach  "$1" $2 $3
    echo  "</div>" >>$2
    echo  "</script>" >>$2
}
function modal {
    local    label=`echo $1 | jq -r '.label'`
    local    id=`echo $1 | jq -r '.id'`
    local    class=`echo $1 | jq -r '.class'`
    local    icon=`echo $1 | jq -r '.icon'`
    local    style=`echo $1 | jq -r '.style'`

   echo "<script type=\"text/ng-template\" id=\"$id.html\">" >> $2
   echo -n "<div " >> $2
    classmaker "$1" $2 $3
   echo "> " >> $2
   echo "<div class=\"modal-header\">" >> $2
   echo "<h5 class=\"modal-title\" id=\"modal-title1\">" >> $2
   echo "<i class=\"$icon\"></i>" >> $2
   echo $label >> $2
   echo "</h5>" >> $2
   echo "</div>" >> $2
   echo "<div class=\"modal-body\" id=\"modal-body1\">" >> $2
         foreach "$1" $2 $3
   echo "</div>" >> $2
   echo "</div>" >> $2
   echo "</script>" >> $2

}

function _ul {
  local    label=`echo $1 | jq -r '.class'`
  local    attrs=`echo $1 | jq -r '.otherAttr'`
  local    style=`echo $1 | jq -r '.style'`

  echo -n "<ul " >> $2
  classmaker "$1" $2 $3
  if [ "$attrs" != "null" ]; then
    echo -n " $attrs " >> $2
  fi
    echo  ">" >> $2
      foreach "$1" $2 $3
  echo  "</ul>"  >> $2
}
function _li {
  local    label=`echo $1 | jq -r '.class'`
  local    attrs=`echo $1 | jq -r '.otherAttr'`
  local    collection=`echo $1 | jq -r '.collection'`
  local    style=`echo $1 | jq -r '.style'`

    echo -n "<li " >> $2
    classmaker "$1" $2 $3
     if [ "$attrs" != "null" ]; then
        echo -n " $attrs" >> $2
    fi
    if [ "$collection" != "null" ]; then
        echo -n "ng-repeat=\" item in $collection\"" >> $2
    fi
    echo  ">" >> $2
      foreach "$1" $2 $3
  echo  "</li>"  >> $2
}
function button {
    local    label=`echo $1 | jq -r '.label'`
    local    div=`echo $1 | jq -r '.div'`
    local    method=`echo $1 | jq -r '.method'`

    if [ $div == true ]; then
	echo -n "<div"  >> $2
	classmaker "$1" $2 $3
	echo "<a href=\"\" ng-click=\"$method\">$label</a></div>" >> $2
    else
	echo -n "<button " >> $2
	classmaker "$1" $2 $3
	echo " ng-click=\"$method\">$label</button>" >> $2
    fi
}

function _select {
    local    id=`echo $1 | jq -r '.id'`
    local    rvalue=`echo $1 | jq -r '.rvalue'`
    local    dvalue=`echo $1 | jq -r '.dvalue'`
    local    mode=`echo $1 | jq -r '.model'`
#   local    static=`echo $1 | jq -r '.static'`
    local    collection=`echo $1 | jq -r '.collection'`
    local    select_type=`echo $1 | jq -r '.select_type'`
    local    options=`echo $1 | jq -r '.options'`

    echo -n "<div "  >> $2
 #  classmaker "$1" $2 $3
 #   if [ "$class" == "null" ]; then
	echo -n " class=\"form-group\"" >> $2
 #  fi

    echo ">"  >> $2

    component_label "$1" $2 $3

    echo -n "<select name=\"$id\" id=\"$id\" ng-model=\"$mode\" class=\"form-control\" >" >> $2
    
    if [ "$rvalue" != "null" ] && [ "$dvalue" != "null" ]; then
	echo "<option ng-repeat='item in $collection' value=\"{{item.$rvalue}}\"> {{item.$dvalue}} ">> $2
    else
	echo "<option ng-repeat='item in $collection' value=\"{{item.rvalue}}\"> {{item.dvalue}} ">> $2
    fi
    echo  " </option>" >> $2
    echo " </select>" >> $2
    
    echo "</div>"  >> $2
}

function paragraph {
    local    model=`echo $1 | jq -r '.model'`

    echo -n "<p"  >> $2
    classmaker "$1" $2 $3
    echo ">" >> $2
    foreach "$1" $2 $3
    echo "</p>" >> $2
}

function textarea {
    local    id=`echo $1 | jq -r '.id'`
    local    model=`echo $1 | jq -r '.model'`
    local    ronly=`echo $1 | jq -r '.ronly'`
    local    rows=`echo $1 | jq -r '.rows'`
#    local    cmoption=`echo $1 | jq -r '.cmoption'`
    local    codesource=`echo $1 | jq -r '.codesource'`
    echo -n "<div class=\"form-group\" " >> $2
    classmaker2 "$1" $2 $3
    echo ">" >> $2

    component_label "$1" $2 $3
    if [ $ronly == true ]; then
	echo "<p id=\"$id\">{{$model}}</p>"  >> $2
    else
	echo "<div>" >> $2
  	echo -n "<textarea id=\"$id\" class=\"form-control\" name=\"$id\" " >> $2
	if [ $codesource == true ]; then
	    echo -n "ui-codemirror=\"cmOption\" " >> $2
	fi
	if [ "$rows" != "null" ]; then
	    echo -n "rows=\"$rows\"" >> $2
	fi
	echo "ng-model=\"$model\"></textarea>" >> $2
	echo "</div>" >> $2
    fi
    echo "</div>" >> $2

}

function radio {
    local    label=`echo $1 | jq -r '.label'`
    local    options=`echo $1 | jq -r '.options'`
    local    separator=`echo $1 | jq -r '.separator'`
    local    model=`echo $1 | jq -r '.model'`
    local    class=`echo $1 | jq -r '.class'`
    local    id=`echo $1 | jq -r '.id'`

    echo -n "<div  "  >> $2

    echo ">"  >> $2
    component_label "$1" $2 $3
    echo -n "<div "  >> $2
    classmaker "$1" $2 $3
    echo ">" >> $2


    if [ $separator != "" ]; then
    	IFS=$separator
    fi

    local i

    for i in $options
    do
	
	echo "<label class=\" radio-inline\">" >> $2
        echo "<input id=\"$id\" type=\"radio\" value=\"$i\" ng-model=\"$model\"> $i" >> $2
	echo "</label>" >> $2
    done
    echo "</div>" >> $2
    echo "</div> <!-- div id:$id -->"  >> $2
    unset IFS

}

function img {
   
    local    alt=`echo $1 | jq -r '.alt'`
    local    src=`echo $1 | jq -r '.src'`
    echo -n "<img " >> $2
    classmaker "$1" $2 $3
    echo " src=\"$src\" alt=\"$alt\"/>" >> $2
}

function span {
    local   model=`echo $1 | jq -r '.model'`
    local   label=`echo $1 | jq -r '.label'`
    local   id=`echo $1 | jq -r '.id'`
    local    attrs=`echo $1 | jq -r '.otherAttr'`

    local nmodel

#    if [ "$3" == "null"  ]; then
#	nmodel=$model
#    else
#	nmodel=`echo "$3.$model"`
#    fi

    echo -n "<span "  >> $2
    classmaker "$1" $2  $3
    if [ "$attrs" != "null" ]; then
      echo -n " $attrs" >> $2
    fi
    if [ "$id" != "null" ]; then
        echo -n " id=\"$id\" " >> $2
    fi
    echo -n ">" >> $2
    if [ "$model" != "null" ]; then
#        echo -n "{{$nmodel}}" >> $2
         echo -n "{{item.$model}}" >> $2
    elif [ "$label" != "null" ]; then
	echo -n "$label" >> $2
    fi
    echo "</span>" >> $2
}

function form {
    local validation=`echo $1 | jq -r '.validation'`

    echo -n "<form"  >> $2
    classmaker "$1" $2 $3
    if [ $validation == true ]; then
        echo -n " novalidate=\"novalidate\"" >> $2
    fi
    echo ">" >> $2

    echo "<div class=\"form-body\">" >> $2

    foreach "$1" $2 $3

    echo "</div>" >> $2
    echo "</form>" >> $2
}

function treeview {

    local    treeid=`echo $1 | jq -r '.treeid'`
    local    class=`echo $1 | jq -r '.class'`
    local    treemodel=`echo $1 | jq -r '.treemodel'`
    local    nodeid=`echo $1 | jq -r '.nodeid'`
    local    nodelabel=`echo $1 | jq -r '.nodelabel'`
    local    onclick=`echo $1 | jq -r '.onclick'`
    local    nodechildren=`echo $1 | jq -r '.nodechildren'`
    local    treemodel=`echo $1 | jq -r '.treemodel'`
    local    treeaction=`echo $1 | jq -r '.treeaction'`

    echo "<div class=\"$class\"" >> $2
    echo "data-angular-treeview=\"true\"" >> $2
    echo "data-tree-id=\"$treeid\"" >> $2
    echo "data-tree-model=\"$treemodel\"" >> $2
    echo "data-node-id=\"$nodeid\"" >> $2
    echo "data-node-click=\"$onclick\"" >> $2
    echo "data-node-children=\"$nodechildren\"" >> $2
    echo "data-tree-actions=\"$treeaction\"" >> $2
    echo ">" >> $2
    echo "</div>" >> $2

}
# rewriting group generation
    function group {

    local    src=`echo $1 | jq -r '.src'`
    local    label=`echo $1 | jq -r '.label'`
    local    num=`echo $1 | jq -r '.num'`
    local    collapsible=`echo $1 | jq -r '.collapsible'`
    local    id=`echo $1 | jq -r '.id'`
    local    pos=`echo $1 | jq -r '.position'`
    local    width=`echo $1 | jq -r '.width'`
    local    class=`echo $1 | jq -r '.class'`
    local    row=`echo $1 | jq -r '.row'`
    local    offset
    local    icon=`echo $1 | jq -r '.icon'`
    local    gtype=`echo $1 | jq -r '.group_type'`
    local    expr=`echo $1 | jq -r '.expression'`
    local    typeparent=`echo $1 | jq -r '.typeparent'`
    local    uiview=`echo $1 | jq -r '.uiview'`
    local    style=`echo $1 | jq -r '.style'`
    local    attrs=`echo $1 | jq -r '.otherAttr'`

    if [ "$typeparent" == "tab" ];then
            echo "<uib-tab index=\"$num\"  heading=\"$label\"> <!--begins-->" >> $2
            foreach "$1" $2 $3
            echo "</uib-tab> <!--end-->" >> $2
    elif [ "$typeparent" == "accordion" ];then
            echo    "<div uib-accordion-group class=\"panel-default\" heading=\"$label\">" >> $2
                foreach "$1" $2 $3
            echo    "</div>" >> $2
    else
        echo -n "<div id=\"$id\" " >> $2
        if [ "$expr" != "null" ];then
            echo  -n " ng-if=\"$expr\" " >> $2
        fi
        if [ $uiview == true ];then
	        echo -n " ui-view=\"\"" >> $2
    	fi
	    if [ "$src" != "null" ];then
            echo -n " ng-include=\"$src\"" >> $2
    	fi
        if [ "$style" != "null" ];then
            echo -n " style=\"$style\" " >> $2
        fi
            echo -n " class=\"" >> $2
        if [ $row == true ];then
            echo -n " row " >> $2
    	fi
        if [ $collapsible == true ];then
            echo  -n " collapse " >> $2
        fi
        if [ "$class" != "null" ] ;then
            echo -n "$class" >> $2
        fi
        if [  $width != "null" ];then
            case $pos in
            "left")
            echo  -n " col-md-$width" >> $2
                        ;;
            "center")
                        rest=`expr 12 - $width`
                        offset=`expr $rest / 2`
                        echo -n  " col-md-$width col-md-offset-$offset " >> $2  ;;
            "right")
                        offset=`expr 12 - $width`
                        echo -n " col-md-$width col-md-offset-$offset " >> $2
                        ;;
            *)
               echo -n " col-md-$width " >> $2
                        ;;
            esac;
        fi
        echo -n "\"" >> $2
        if [ "$attrs" != "null" ]; then
           echo -n " $attrs" >> $2
        fi
        echo   "> <!-- $id begins-->" >> $2
#        if [ "$label" != "null" ];then
#            echo "<h4> $label </h4>" >> $2
##            echo "<hr>" >> $2
#	    fi
		foreach "$1" $2 $3

	echo "</div> <!-- $id ends-->" >> $2
    fi

}
# group end

function accordion {
    local    class=`echo $1 | jq -r '.class'`
    local    id=`echo $1 | jq -r '.id'`
    local    style=`echo $1 | jq -r '.style'`

    echo    "<uib-accordion close-others=\"true\">" >> $2
              foreach "$1" $2 $3
    echo    "</uib-accordion>" >> $2

}
function link {
    local label=`echo $1 | jq -r '.label'`
    local click=`echo $1 | jq -r '.click'`
    local tog=`echo $1 | jq -r '.toggle'`
    local sref=`echo $1 | jq -r '.sref'`
    local dl=`echo $1 | jq -r '.dynamic_label'`
    local children=`echo $1 | jq -r '.children'`
    local LEN=`echo $1 | jq '.children |length'`


    echo -n "<a " >> $2
    if [ "$sref" != "null" ]; then
	echo -n "ui-sref=\"$sref\"" >> $2
    fi
     if [ "$tog" != "null" ]; then
	echo -n "  data-toggle=\"collapse\" data-target=\"#$tog\"" >> $2
    fi
    classmaker "$1" $2 $3

    if [ "$click" != "null" ]; then
	echo -n " ng-click='$click'" >> $2
    fi

    echo ">" >> $2
    if [ "$children" != "null" ] && [ $LEN != 0 ]; then
	foreach "$1" $2 $3
    else
	echo -n "$label" >> $2
    fi
    echo "</a>" >> $2
}

function label {
    local nmodel=""
    local  model=`echo $1 | jq -r '.model'`
    local label=`echo $1 | jq -r '.label'`

    if [ "$label" = "null" ]; then
	if [ "$3" != "null" ]; then
    	    nmodel=`echo $3.$model`
	else
    	    nmodel=$3
	fi
	echo "<label> {{$nmodel}} </label>" >> $2
    else
	echo "<label> $label </label>" >> $2
    fi
}

function hx {
    local label=`echo $1 | jq -r '.label'`
    local lvl=`echo $1 | jq -r '.lvl'`
    local style=`echo $1 | jq -r '.style'`
    local class=`echo $1 | jq -r '.class'`

    if [ "$label" != "" ]; then
	echo "<h$lvl> $label </h$lvl> " >> $2
    fi


}

function list {
    local  root=`echo $1 | jq -r '.root'`
    local label=`echo $1 | jq -r '.label'`
    local  model=`echo $1 | jq -r '.model'`
#    local  class=`echo $1 | jq -r '.class'`

    if [ "$root" != "null" ] && [ "$root" != "" ]; then
	echo -n "<$root " >> $2
	classmaker "$1" $2 $3
	echo ">" >> $2

	echo -n "<$label " >> $2
    else
	echo -n "<$label " >> $2
	classmaker "$1" $2 $3
    fi

    echo " ng-repeat='item in $model'>" >> $2

    foreach "$1" $2 item

    echo "</$label>" >> $2

     if [ "$root" != "null" ] && [ "$root" != "" ]; then
	echo "</$root>" >> $2
    fi
}

#-------------------------------------------------------
function form_wizard {
    local    class=`echo $1 | jq -r '.class'`
    local    id=`echo $1 | jq -r '.id'`
    local    style=`echo $1 | jq -r '.style'`
    local    stepsCollection=`echo $1 | jq -r '.stepsCollection'`

    echo -n "<div class=\"container-fluid" >> $2
    if [ "$class" != "null" ]; then
	echo -n " $class\">" >> $2
    fi
    echo "\">"  >> $2
    echo "<div data-wizard-init>" >> $2
    echo "<ul  class=\"steps\">" >> $2
    echo "<li ng-repeat=\"item in $stepsCollection\" data-step=\"{{item.stepNum}}\">{{item.stepTitle}}</li>" >> $2
    echo "</ul>"  >> $2
    echo "<div class=\"steps-content\">" >> $2
    foreach "$1" $2 $3
    echo "</div>" >> $2
    echo "</div>" >> $2
    echo "</div>" >> $2
}

function wizardlvl {
    local    level=`echo $1 | jq -r '.level'`
    local    title=`echo $1 | jq -r '.title'`

    echo "<div data-step=\"$level\">" >> $2
    echo "<h4>$title</h4>" >> $2
    	foreach "$1" $2 $3
    echo "</div>" >> $2
}

function tab {
    local    tabs=`echo $1 | jq -r '.tabs'`
    local    tab_type=`echo $1 | jq -r '.tab_type'`
    local    model=`echo $1 | jq -r '.model'`
    local    class=`echo $1 | jq -r '.class'`
    local    id=`echo $1 | jq -r '.id'`
    local    style=`echo $1 | jq -r '.style'`
    local    typeParent=`echo $1 | jq -r '.typeParent'`
    
    
    echo "<uib-tabset >"  >> $2
    foreach "$1" $2 $3
    echo "</uib-tabset>">> $2
    
}


#-------------------------------------------------------


function table {
    local    headers=`echo $1 | jq -r '.headers'`
    local    cols=`echo $1 | jq -r '.columns'`
    local    collection=`echo $1 | jq -r '.collection'`
    local    res=`echo $1 | jq -r '.resolve'`
    local    class=`echo $1 | jq -r '.class'`

    echo "<table  " >> $2
    if [ "$class" != "null" ]; then
        classmaker "$1" $2 $3
    else
        echo "class=\"table table-condensed\">" >> $2
    fi
    echo " <thead> " >> $2
    echo "<tr>" >> $2
    echo "<th ng-repeat='header in $cols'>{{header}}</th>" >> $2
    echo "</thead>" >> $2
    echo "<tbody>" >> $2
    echo "<tr ng-repeat=\"item in requests\">" >> $2
    echo "<td>{{item.name}}</td>" >> $2
    echo "<td>{{item.type}}</td>" >> $2
    echo "<td>{{item.style}}</td>" >> $2
    echo "<td>{{item.defaultValue}}</td>" >> $2
    echo "</tr>" >> $2
    echo "</tbody>" >> $2
    echo "</table>" >> $2
}




function view_generator {
    #echo "gen: $1"
    local   type=`echo $1 | jq -r '.type'`
    # echo " VIEW_GENERATOR type :$type"
    case $type in
	"hr") #echo hr
	    ;;
	"label") label "$1" $2 $3
	    ;;
	"input") input "$1" $2 $3
	    ;;
	"button") button "$1" $2 $3
	    ;;
	"select") _select "$1" $2 $3
	    ;;
    "accordion") accordion "$1" $2 $3
	    ;;
	"<p>")  paragraph "$1" $2
	    ;;
	"textarea")  textarea "$1" $2
	    ;;
	"radio")  radio "$1" $2
	    ;;
	"img")  img "$1" $2 $3
	    ;;
	"hx")  hx "$1" $2 $3
	    ;;
	"treeview") treeview "$1" $2 $3
	    ;;
	"span")  span "$1" $2 $3
	    ;;
	"form")  form "$1" $2 $3
	    ;;
	"group")  group "$1" $2 $3
	    ;;
	"link")  link "$1" $2 $3
	    ;;
	"list")  list "$1" $2 $3
	    ;;
    "ul")  _ul "$1" $2 $3
	    ;;
    "li")  _li "$1" $2 $3
	    ;;
	"table")  table "$1" $2 $3
	    ;;
	"tab")  tab "$1" $2 $3
	    ;;
	"modal")  modal "$1" $2 $3
            ;;
	"dropdown")  dropdown "$1" $2 $3
            ;;
	*)  echo "type: $type not expected"
	    ;;
    esac;
}

function foreach {
    local i
    local LEN=`echo $1 | jq '.children |length'`
    local type=`echo $1 | jq '.type'`
    local id=`echo $1 | jq '.id'`
    #echo "foreach data: $1 len: $LEN"

    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$1' | jq -c '.children[$i]'"
        view=`eval $CMD`
	#echo "FOREACH: $view"
        echo "foreach children : $LEN type : $type id : $id  "
	view_generator "$view" $2 $3
    done

}

# begin  COMPONENTS READ ONLY GENERATION

function component_label_ro {
    local    label=`echo $1 | jq -r '.label'`
    local    id=`echo $1 | jq -r '.id'`
    local    required=`echo $1 | jq -r '.required'`

    if [ "$label" != null ]; then
        echo "<span >$label</span>" >> $2
    fi
}

function generic_ro { # for input, select, textarea
    local    label=`echo $1 | jq -r '.label'`
    local    model=`echo $1 | jq -r '.model'`

    echo "<div class=\"ronly\">" >> $2
    component_label_ro "$1" $2 $3
    echo "<p>{{$model}}</p>"  >> $2
    echo "</div>" >> $2
}

function container_ro { # form, group

    echo "<div class=\"ronly-group\">" >> $2

    foreach_ro "$1" $2 $3

    echo "</div>" >> $2
}


function read_only_generator {
    #echo "gen: $1"
    local    type=`echo $1 | jq -r '.type'`
    # echo " VIEW_GENERATOR type :$type"
    case $type in
	"hr") #echo hr
	    ;;
	"label") label "$1" $2 $3
	    ;;
	"input") generic_ro "$1" $2 $3
	    ;;

	"select") generic_ro "$1" $2 $3
	    ;;
	"paragraph")  paragraph "$1" $2 $3
	    ;;
	"textarea")  generic_ro "$1" $2 $3
	    ;;
	"img")  img "$1" $2 $3
	    ;;
	"span")  span "$1" $2 $3
	    ;;
	"form")  container_ro "$1" $2 $3
	    ;;
	"group")  container_ro "$1" $2 $3
	    ;;
	"link")  link "$1" $2 $3
	    ;;
	"list")  list "$1" $2 $3
	    ;;
	"table")  table "$1" $2 $3
	    ;;
	"tab")  tab "$1" $2 $3
	    ;;
	*)  echo "type: $type not expected"
	    ;;
    esac;
}


function foreach_ro {
    local i
    local LEN=`echo $1 | jq '.children |length'`
    #echo "foreach data: $1 len: $LEN"

    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$1' | jq -c '.children[$i]'"
        view=`eval $CMD`
	#echo "FOREACH: $view"
	read_only_generator "$view" $2
    done

}

# end   READ ONLY GENERATION

function partial {

    local    readonly=`echo $1 | jq -r '.reado'`
    local    file=`echo $1 | jq -r '.label'`
    local    r_file=`echo $1 | jq -r '.label'`
    local    r_file="$2/$r_file.ro.html"
    local    file="$2/$file.html"
    #echo "partial name: $file"
    echo '<!-- Generated html file -->' > $file
   # echo -n '<div' > $file
   # classmaker "$1" $file
   # echo '>' >> $file

    foreach "$1" $file

   # echo '</div>' >> $file

    if [ $readonly == true ]; then
        echo -n '<div' > $r_file
        classmaker "$1" $r_file
        echo '>' >> $r_file
        foreach_ro "$1" $r_file
        echo '</div>' >> $r_file
    fi
}


function header {
    echo "'use strict';" > $2
    echo -n "define(['public/application'" >> $2

    requirejs_dependencies "$1" $2

    echo -n "], " >> $2
}

function footer {
    echo ");" >> $1
}

function requirejs_dependencies {
    echo "requirejs_dependencies"
}



function controller_dependencies {
    local i
    local LEN=`echo $1 | jq '. |length'`

    for ((i=0 ; i<LEN ; i++))
    do
    	local CMD="echo '$1' | jq -r '.[$i]'"
    	local depend=`eval $CMD`

	if [ $2 == 0 ]; then
	    echo -n ", '$depend'" >> $3
	elif [ $2 == -1 ] && [ $i -eq 0 ]; then
	    echo -n "$depend" >> $3
	elif [ $2 == -1 ] && [ $i -eq 1 ]; then
	    echo -n ", $depend" >> $3
	else
	    echo -n ", $depend" >> $3
	fi
    done
}

function _resolve {
    local i
    local LEN=`echo $1 | jq '. |length'`
    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$1' | jq -c '.[$i]'"
    	var=`eval $CMD`
	r=`echo $var | jq '.resolve'`
	name=`echo $var | jq -r '.name'`

	if [ $r == true ] && [ $2 -eq 0 ]; then
	    echo -n ", '$name'" >> $3
	elif [ $r == true ] && [ $2 -eq 1 ]; then
	    echo -n ", $name" >> $3
	fi
    done
}

function resolve (){
    local i
    local rp=0
    local vars=`echo $1 | jq '.variables'`
    local dps=`echo $1 | jq '.dependencies'`
    local LEN=`echo $1 | jq '.variables |length'`

    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$vars' | jq -c '.[$i]'"
    	var=`eval $CMD`
	r=`echo $var | jq '.resolve'`
	name=`echo $var | jq -r '.name'`
	method=`echo $var | jq -r '.method'`
	data=`echo $var | jq -r '.data'`

	if [ $r == true ] && [ $rp -eq 0 ]; then
	    rp=1
	    echo -e ",\nresolve: {" >> $2
	elif [ $r == true ]; then
	    echo "," >> $2
	fi

	if [ $r == true ]; then
	    echo -n "$name: function(" >> $2
	    controller_dependencies "$dps" -1 $2
	    echo "){" >> $2
	    echo "$method.then(function(data){" >> $2
	    echo -n "return data" >> $2
	    if [ $data != null ]; then
		echo -n ".$data" >> $2
	    fi

	    echo -ne ";\n});\n}" >> $2
	fi
    done

    if [ $rp -eq 1 ]; then
	echo -ne "\n}" >> $2
    fi
}

function variable {
    local r=`echo $var | jq '.resolve'`
    local name=`echo $var | jq -r '.name'`
    local  method=`echo $var | jq -r '.method'`
    local value=`echo $var | jq -r '.value'`
    local data=`echo $var | jq -r '.data'`

    if [ "$value" != null ] && [ "$value" != "" ]; then
	echo "\$scope.$name = $value;" >> $2
    elif [ $r == true ]; then
	echo "\$scope.$name = $name;" >> $2
    else

	echo "$method.then(function(data){" >> $2
	echo -n "\$scope.$name = data" >> $2
	if [ $data != null ]; then
	    echo -n".$data" >> $2
	fi

	echo ";" >> $2
	echo "});" >> $2
    fi

}
function variables {
    local i
    local LEN=`echo $1 | jq '. |length'`


    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$vars' | jq -c '.[$i]'"
    	var=`eval $CMD`
	onenter=`echo $var | jq -r '.onEnter'`
	onexit=`echo $var | jq -r '.onExit'`

        if [ $onenter != true ] || [ $onexit != true ]; then
	    variable $1 $2
	fi
    done
}

function _controller {
    local i
    local vars=`echo $1 | jq -r '.variables'`

    echo -n "['\$scope'" >> $2
    controller_dependencies "$dp" 0 $2
    _resolve "$vars" 0 $2

    echo -n ", function(\$scope" >> $2
    controller_dependencies "$dp" 1 $2
    _resolve "$vars" 1 $2

    echo "){" >> $2
    variables "$vars" $2

    local LEN=`echo $1 | jq '.functions |length'`
    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$1' | jq -r '.functions[$i]'"
    	fn=`eval $CMD`
	name=`echo $fn | jq -r '.name'`
	content=`echo $fn | jq -r '.content'`

	echo "\$scope.$name = $content;" >> $2
    done

    echo "}]" >> $2
}

function controller {
    local label=`echo $1 | jq -r '.label'`
    local file="$2/$label.js"

    header "$1" $file

    echo "function (angular, app){" >> $file
    echo -n "app.register.controller('$label'," >> $file

    _controller "$1" $file
    echo  ");" >> $file
    echo -n "}" >> $file

    footer $file
}

function onenter {
    local LEN=`echo $1 | jq '. |length'`
    local i
    local j=0
    local enter
    local var
    local CMD
    local enter

    for ((i=0 ; i<LEN ; i++))
    do
    	CMD="echo '$1' | jq -c '.[$i]'"
    	var=`eval $CMD`
	enter=`echo $var | jq -r '.onEnter'`

        if [ $enter == true ]; then
	    j=1
	fi
    done

    if [ j==1 ]; then
	j=0
	echo -en  ",\nonEnter: function(" >> $2
	for ((i=0 ; i<LEN ; i++))
	do

    	    CMD="echo '$1' | jq -c '.[$i]'"
    	    var=`eval $CMD`
	    enter=`echo $var | jq -r '.onEnter'`
	    name=`echo $var | jq -r '.name'`
	    if [ $enter == true ]; then

		name=`echo "$name" | cut -d. -f1`

		echo -n "$name" >> $2

		if [ $j != 0 ]; then
                    echo -n  "," >> $2
		    j=1
		fi
	    fi
	done
	echo "){" >>$2

	for ((i=0 ; i<LEN ; i++))
	do
    	    CMD="echo '$1' | jq -c '.[$i]'"
    	    var=`eval $CMD`
	    enter=`echo $var | jq -r '.onEnter'`

            if [ $enter == true ]; then
		variable $var $2
	    fi
	done
	echo -e "}" >>$2

    fi
}

function state {
    local st=`echo $1 | jq -r '.state'`
    local url=`echo $1 | jq -r '.url'`
    local turl=`echo $1 | jq -r '.templateUrl'`
    local label=`echo $1 | jq -r '.label'`
    local inline=`echo $1 | jq -r '.inline'`
    local vars=`echo $1 | jq '.variables'`

    echo ".state('$st',{"  >> $2
    echo "url: '$url',"  >> $2
    echo -n "templateUrl: '$turl'" >> $2

    resolve "$1" $2

    if [ $inline == true ]; then
	echo -e ",\ncontroller:" >> $2
	_controller "$1" $2
    else
	echo -e ",\ncontroller: '$label'" >> $2
    fi

    onenter "$vars" $2
    # onexit  "$vars" $2

    echo "})" >> $2
}

function lazy {
    local i
    local file="$2/lazy.js"
    header "$1" $file

    echo "function (app){" >> $file
    echo "app.register.stateProvider" >> $file

    local LEN=`jq '.models |length' $1`
    for ((i=0 ; i<LEN ; i++))
    do
    	local CMD="jq -c '.models[$i]' $1"
    	local st=`eval $CMD`
	state "$st" $file
    done

    echo -n "}" >> $file

    footer $file
}

function views_generator {
    local i
    local LEN=`jq '.models |length' $1`

    for ((i=0 ; i<LEN ; i++))
    do
    	local CMD="jq -c '.models[$i]' $1"
    	local view=`eval $CMD`
	local lab=`echo $view | jq -r '.label'`

	partial "$view" $2
	echo "$lab ... OK"
    done

}


function www_generator {
    local lzm #=`jq '.lzm' $1`
    local i
    local LEN=`jq '.models |length' $1`

    echo "generating views...."
    views_generator $1 $2 $3
    echo "views generation DONE"

    # for ((i=0 ; i<LEN ; i++))
    # do
    # 	local CMD="jq -c '.models[$i]' $1"
    # 	local view=`eval $CMD`
    # 	local llzm=`echo $view | jq -r '.lzm'`

    # 	if [ $llzm == true ]; then
    # 	    lzm=true
    # 	fi
    # done

    # if [ "$lzm" == true ]; then

    # 	echo "generating lazy file ...."

    # 	lazy $1 $2 $3
    # 	echo "lazy file DONE"
    # fi

    #  echo "generating controllers...."
    # controllers_generator $1 $2
   # echo "controllers generation DONE"
}



#$1 fname
#$2 dest directory
#3 variable prefix
www_generator $1 $2
