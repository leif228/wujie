//解析---------------------------------------------------------
function AT_into_JS(AT)
{
	
	var DEFINE_strhead = 'AT@';
	var DEFINE_strend = '#*';
	
 var jsin;
 var headpoint = AT.indexOf(DEFINE_strhead);//找出帧头
 var endpoint = AT.indexOf(DEFINE_strend);//找出帧尾
 
 //console.log(headpoint+'GET:'+endpoint);
 if(headpoint!=-1 && endpoint!=-1)
 {
  var strhead = AT.substr(headpoint,DEFINE_strhead.length);//取出帧头
  var strend = AT.substr(endpoint,DEFINE_strend.length);//取出帧尾
  
  //console.log(strhead);
  //console.log(strend);
  //console.log('ATlen:'+AT.length);
  //console.log('endpoint:'+endpoint);
  
  if(DEFINE_strhead == strhead && DEFINE_strend == strend)//为AT
  {
   //console.log('cmd:'+AT);
   
   var point = headpoint+DEFINE_strhead.length+1;
   var len = 0;
   eval(ATOPEN(1,'country',3));
   eval(ATOPEN(1,'area',6));
   eval(ATOPEN(1,'date',8));
   eval(ATOPEN(1,'serial',4));
   eval(ATOPEN(1,'type',1));
   eval(ATOPEN(0,'net',1));
   //node
   eval(ATOPEN(0,'nodenone',8));
   eval(ATOPEN(0,'nodedev',4));
   eval(ATOPEN(0,'noderoom',2));
   eval(ATOPEN(0,'nodeid',2));
   
   eval(ATOPEN(0,'pri',4));
   eval(ATOPEN(0,'buss',4));
   eval(ATOPEN(0,'port',4));
   eval(ATOPEN(0,'cmd',4));
   point += len;
   //console.log(point);
   if(point<endpoint)//有参数
   {
    point -= 4;
    
    eval(ATOPEN(0,'paralen',4));
    eval(ATOPEN(0,'para',endpoint-point-4));
    console.log('paralen:'+paralen+',para:'+para);
    
   }
   else if(point==endpoint)//无参数
   {
    var para='';
   }
   else return null;//错误帧
   
   var devtypename = findout(DevtypeArr,'Devtype','DevtypeNum',nodedev);
   var bussname = findout(BussArr,'BusinessName','BusinessNum',buss);
   var noderoomstr=findout(RoomArr,'RoomName','RoomNum',noderoom);
   //console.log("devtype:"+devtypename);
   
   console.log(country+','+area+','+date+','+serial+','+type+' | '+net+','+nodedev+','+noderoom+','+nodeid+' | '+pri+','+buss+','+port+','+cmd);
   //console.log(pri+','+buss+','+port+','+cmd);
   var oid = country+area+date+serial+type;
   
   //console.log(json.dev_room + json.dev_inROOMID + "号" + json.devtype);
   //t