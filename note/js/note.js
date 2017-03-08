var vm = new Vue({
	el: '#myNote',
	data: {
		message: '这是一个在线便签',
		tips: '预防颈椎，从我做起',
		noteList: [],
		isShow: false,
		isRotate: false,
		// 便签内容
		noteTitle: '',
		noteContent: '',
		noteBgColor: ''
	},
	//初始化
	mounted: function(){
		this.$nextTick(function(){
			// this.message = 'vueJs';
			//展示便签列表
			this.showList();
		})
	},
	filters: {
		//格式化时间
		timeFormat: function(value){
			let d = new Date(value),
				yyyy = d.getFullYear(),
				MM = d.getMonth() + 1,
				dd = d.getDate(),
				hh = d.getHours(),
				mm = d.getMinutes(),
				ss = d.getSeconds();
			MM = vm.addZero(MM);
			dd = vm.addZero(dd);
			mm = vm.addZero(mm);
			ss = vm.addZero(ss);
			return (yyyy + '年' + MM + '月' + dd + '日 ' + hh + ':' + mm + ':' + ss);
		}
	},
	//一些方法
	methods: {
		//展示便签列表
		showList: function(){
			//如果本地有数据就读取本地，反则创建新的。
			let note = localStorage.getItem("localNote");
			if (note) {
				this.noteList = JSON.parse(note);
			}else{
				this.noteList = [{
								title: "day1",
								content: "Try to create a new note!",
								timeStamp: +new Date(),
								background: "#cdfbcd"
							}];
			};
			// var that = this;
			// this.$http.get("json/note.json",{"id": 123}).then(function(res){
			// 	console.log(res);
			// 	that.noteList = res`;
			// })
		},
		editTitle: function(){},
		addZero: function(e){
			return e = (e < 10 ? '0' + e : e);
		},
		//弹出便签
		showNote: function(){
			this.isShow = !this.isShow;
			this.isRotate = !this.isRotate;
		},
		//改变便签的背景色
		changeBgColor: function(event){
			if (event.target.tagName == "SPAN") {
				let bgColor = event.target.attributes[0].value;
				this.noteBgColor = bgColor;
			};
		},
		//创建便签
		createNote: function(){
			let now = + new Date();
			//创建便签
			this.noteList.push({
				title: this.noteTitle,
				content: this.noteContent,
				timeStamp: now,
				background: this.noteBgColor
			});
			//清空，关闭创建便签的模板
			this.noteTitle = '';
			this.noteContent = '';
			this.isShow = !this.isShow;
			this.isRotate = !this.isRotate;
			//保存本地
			vm.saveNote();
		},
		//delete note
		deleteNote: function(item){
			let index = this.noteList.indexOf(item);
			this.noteList.splice(index,1);
			//保存本地
			vm.saveNote();
		},
		saveNote: function(){
			//保存数据到本地
			let localNote = JSON.stringify(this.noteList);
			localStorage.setItem("localNote",localNote);
		}
	}
})
