function nowToday(){
	let week =['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร','เสาร์']
	let month =['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']

	let date=new Date()
	let packdate = "วัน "+week[date.getDay()]+"ที่"+date.getDate()+" "+month[date.getMonth()]+" พ.ศ. "+(543+date.getFullYear())+ " เวลา: "+ date.toLocaleTimeString()
	return packdate
}