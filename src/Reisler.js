const axios = require('axios');//Veriler Çekemk için axios kütüphanesini Kullandık.
const cheerio = require('cheerio');//HTML içeriğini parse etmek cheerio kütüphanesini Kullandık.
const fs = require('fs');//veriler json dosyasına kayıd etmek için fs Kullandık.

const url = 'https://en.wikipedia.org/wiki/List_of_presidents_of_Turkey';//hangi url'den veriler alıncağanı yazıyoruz
const Reisler = [];//Boş Bir Dizi Oluşturup içine gelen verileri yazdırmak için. 

async function getHTML() {
  const { data: html } = await axios.get(url);//axios kullanılarak belirtilen URL'den HTML içeriğini çeken asenkron bir fonksiyon tanımlanır.
  return html;
}

getHTML().then((res) => {
  const $ = cheerio.load(res);//Cheerio kütüphanesi ile HTML içeriğini parse eder ve sonra bu verileri işleyip Hazırlar.
  $('.wikitable > tbody > tr').each((i, row) => {
    if (i > 0) { 
      const Name = $(row).find('td:eq(1) a').text().trim();
      const Parti = $(row).find('td:eq(6) a').text().trim();
      const ImageSrc = $(row).find('td:eq(0) a > img').attr('src');

      if (Name && Parti) {
        Reisler.push({ id: i, Name, Parti,ImageSrc});//her döngü iterasyonunda elde edilen verileri Reisler adlı diziye ekler. Veriler, id, Name, Parti ve ImageSrc adlı alanlardan oluşan bir nesne şeklinde push metodu aracılığıyla diziye eklenir.
      }
    }
  });

  //fs.writeFile fonksiyonunu kullanarak Reisler dizisindeki verileri JSON formatında bir dosyaya yazma işlemini gerçekleştirir.
  fs.writeFile('Reisler.json', JSON.stringify(Reisler, null, 2), (err) => {
    if (err) {
      console.log("Errrrror:"); // Verileri alırken veya dosyaya yazarken bir hata oluşursa, hatayı konsola yazdırır.
    }
    console.log('Reisler Geldi'); // Veriler başarıyla alınıp dosyaya yazıldıysa, başarı mesajını konsola yazdırır.
  });
});
