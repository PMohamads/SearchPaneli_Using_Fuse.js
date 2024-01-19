const axios = require('axios');//Veriler Çekemk için axios kütüphanesini Kullandık.
const cheerio = require('cheerio');//HTML içeriğini parse etmek cheerio kütüphanesini Kullandık.
const fs = require('fs');//veriler json dosyasına kayıd etmek için fs Kullandık.

const url = 'https://www.imdb.com/chart/top/';//hangi url'den veriler alıncağanı yazıyoruz
const FilmlerinListesi = [];//Boş Bir Dizi Oluşturup içine gelen verileri yazdırmak için. 

async function getHTML() {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  };

  try {
    const { data: html } = await axios.get(url, { headers });//axios kullanılarak belirtilen URL'den HTML içeriğini çeken asenkron bir fonksiyon tanımlanır.
    return html;
  } catch (error) {
    console.error('Error fetching HTML:', error);
    throw error;
  }
}

getHTML().then((res) => {
  const $ = cheerio.load(res);//Cheerio kütüphanesi ile HTML içeriğini parse eder ve sonra bu verileri işleyip Hazırlar.

  $('ul > li').each((i, element) => {
    if (i > 0) {
      const Name = $(element).find('a > h3').text();
      const ImageSrc = $(element).find('img').attr('src');
      const Year = $(element).find('.sc-1e00898e-7 > span:eq(0)').text();
      //const Rat2 = $(element).find('.ipc-metadata-list-summary-item__tc >span> div > div:eq(2) > div > span:eq(2) > a').text();
      //const imdbRating = $(element).find('.ipc-html-content-inner-div').text();
      //const imdbRating = $('.ipc-link .dli-director-item').text();
      //console.log(imdbRating);

      //console.log(Rat2);
      if (Name && Year) {
        FilmlerinListesi.push({ id: i, Name, Year, ImageSrc });//her döngü iterasyonunda elde edilen verileri Reisler adlı diziye ekler. Veriler, id, Name, Parti ve ImageSrc adlı alanlardan oluşan bir nesne şeklinde push metodu aracılığıyla diziye eklenir.
      }
    }
  });

  //fs.writeFile fonksiyonunu kullanarak Reisler dizisindeki verileri JSON formatında bir dosyaya yazma işlemini gerçekleştirir.
  fs.writeFile('FilmlerinListesi.json', JSON.stringify(FilmlerinListesi), (err) => {
    if (err) {
      console.log("Error:", err); // Verileri alırken veya dosyaya yazarken bir hata oluşursa, hatayı konsola yazdırır.
    } else {
      console.log('Veriler Çalındı'); // Veriler başarıyla alınıp dosyaya yazıldıysa, başarı mesajını konsola yazdırır.
    }
  });
}).catch((error) => {
  console.error('Error in getHTML:', error);//Promise zinciri içinde herhangi bir yerde bir hata olursa hatayı yazar.
});
