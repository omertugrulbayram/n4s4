// ================================================
//    Bu JS'i 7 kahve içerek yazdım
//    "Asteroid çarpmasın diye kod yazıyoruz"
//    NASA Space Apps Challenge 2024
// ================================================

// ================================================
//    NAVIGATION SYSTEM - Tüm sayfalar arası geçiş
//    Bu kısım yeni eklendi, navigasyon için gerekli
// ================================================

// Sayfa yüklendiğinde navigasyonu başlat
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

// Navigasyon sistemini başlat
function initializeNavigation() {
    // Aktif sayfa linkini belirle
    setActiveNavLink();
    
    // Mobil menü toggle (gelecekte eklenebilir)
    setupMobileMenu();
    
    // Smooth scroll için linkleri ayarla
    setupSmoothScroll();
}

// Aktif sayfa linkini belirle
function setActiveNavLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Sayfa adını link href'inden çıkar
        let linkPage = link.getAttribute('href');
        
        // .html uzantısını kaldır
        if (linkPage.includes('.html')) {
            linkPage = linkPage.replace('.html', '');
        }
        
        // index.html veya boş için 'index' döndür
        if (linkPage === '' || linkPage === 'index') {
            linkPage = 'index';
        }
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Mevcut sayfa adını al
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index';
    
    // index.html veya boş path için 'index' döndür
    if (page === '' || page === 'index.html') {
        return 'index';
    }
    
    // .html uzantısını kaldır
    return page.replace('.html', '');
}

// Mobil menü kurulumu (gelecekte genişletilebilir)
function setupMobileMenu() {
    // Şimdilik boş, gelecekte hamburger menü eklenebilir
    console.log('Mobile menu setup - placeholder');
}

// Smooth scroll kurulumu
function setupSmoothScroll() {
    // Sayfa içi linkler için smooth scroll
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Sayfa geçiş animasyonu (isteğe bağlı)
function animatePageTransition(targetUrl) {
    // Fade out animasyonu
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 300);
}

// Navigasyon linklerine click event'leri ekle
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Eğer link aynı sayfaya gidiyorsa, sadece scroll yap
            let targetPage = this.getAttribute('href');
            
            // .html uzantısını kaldır
            if (targetPage.includes('.html')) {
                targetPage = targetPage.replace('.html', '');
            }
            
            // index.html veya boş için 'index' döndür
            if (targetPage === '' || targetPage === 'index') {
                targetPage = 'index';
            }
            
            const currentPage = getCurrentPage();
            
            if (targetPage === currentPage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            // Farklı sayfaya gidiyorsa normal link davranışı
            // (isteğe bağlı olarak animasyon eklenebilir)
        });
    });
});

// ================================================
//    MEVCUT ASTERIOD SIMULATION KODLARI
//    Bu kısım zaten vardı, değiştirilmedi
// ================================================

// Global değişkenler - bu kısım biraz karışık oldu ama çalışıyor
// neden böyle yaptım ben de bilmiyorum :D
let map;
let candidate; // Seçili asteroid
let impactMarker; // Haritadaki çarpma noktası
let impactCircles = []; // Etki alanı çemberleri
let asteroidDatabase = null; // Veritabanı
let selectedAsteroid = null; // Şu anki seçili asteroid

// debug için ekstra değişken (gereksiz ama olsun)
let debugMode = true;

// UI elementleri - DOM'dan alıyoruz
// burda baya bi uğraştım ama sonunda çalıştı
const diameter = document.getElementById('diameter');
const speed = document.getElementById('speed');
const density = document.getElementById('density');
const angle = document.getElementById('angle');

// Değer göstericileri - bunlar çok önemli
const diameterVal = document.getElementById('diameterVal');
const speedVal = document.getElementById('speedVal');
const densityVal = document.getElementById('densityVal');
const angleVal = document.getElementById('angleVal');

// Butonlar ve diğer elementler
// bu butonlar olmadan simülasyon nasıl çalışacak ki?
const simulateBtn = document.getElementById('simulate');
const coordsDisplay = document.getElementById('coordsDisplay');
const asteroidSelector = document.getElementById('asteroidSelector');

// debug için ekstra değişken
let elementCount = 0;

// ================================================
//    GEREKSIZ FONKSIYONLAR BÖLÜMÜ
//    Bunları neden yazdım ben de bilmiyorum :D
// ================================================

// Bu fonksiyon hiçbir işe yaramıyor ama olsun
function calculateRandomNumber() {
    // burda baya bi uğraştım ama sonunda çalıştı
    let randomNum = Math.random() * 100;
    let anotherRandom = Math.random() * 50;
    let uselessCalculation = randomNum + anotherRandom;
    let evenMoreUseless = uselessCalculation * 0.5;
    let finalUseless = evenMoreUseless / 2;
    
    // debug için
    if (debugMode) console.log("Random number calculated:", finalUseless);
    
    return finalUseless;
}

// Bu fonksiyon da gereksiz ama güzel görünüyor
function checkIfAsteroidIsCool(asteroidName) {
    // bu fonksiyon asteroid'in cool olup olmadığını kontrol ediyor
    // neden böyle yaptım ben de bilmiyorum :D
    let coolnessFactor = 0;
    
    if (asteroidName.includes("cool")) {
        coolnessFactor += 10;
    }
    if (asteroidName.includes("awesome")) {
        coolnessFactor += 15;
    }
    if (asteroidName.includes("epic")) {
        coolnessFactor += 20;
    }
    
    // debug için
    if (debugMode) console.log("Asteroid coolness checked:", asteroidName, "Score:", coolnessFactor);
    
    return coolnessFactor > 5;
}

// Bu fonksiyon hiçbir şey yapmıyor ama var
function doNothingButLookImportant() {
    // bu fonksiyon çok önemli görünüyor ama hiçbir şey yapmıyor
    let importantVariable = "I'm very important";
    let anotherImportantVariable = "Me too!";
    let superImportantVariable = importantVariable + " " + anotherImportantVariable;
    
    // debug için
    if (debugMode) console.log("Important function called:", superImportantVariable);
    
    // TODO: belki sonra bir şeyler yaparım (ama etmeyeceğim)
    return superImportantVariable;
}

// Bu fonksiyon çok uzun ve gereksiz
function calculateAsteroidMood(asteroid) {
    // bu fonksiyon asteroid'in ruh halini hesaplıyor
    // neden böyle yaptım ben de bilmiyorum :D
    let mood = "neutral";
    let moodScore = 0;
    
    // asteroid'in boyutuna göre ruh hali
    if (asteroid.diameter_m > 1000) {
        moodScore += 5;
        mood = "angry";
    } else if (asteroid.diameter_m > 500) {
        moodScore += 3;
        mood = "grumpy";
    } else if (asteroid.diameter_m > 100) {
        moodScore += 1;
        mood = "slightly annoyed";
    } else {
        moodScore -= 1;
        mood = "happy";
    }
    
    // asteroid'in hızına göre ruh hali
    if (asteroid.speed_kms > 20) {
        moodScore += 3;
        mood = "very angry";
    } else if (asteroid.speed_kms > 15) {
        moodScore += 2;
        mood = "angry";
    } else if (asteroid.speed_kms > 10) {
        moodScore += 1;
        mood = "slightly angry";
    } else {
        moodScore -= 1;
        mood = "calm";
    }
    
    // asteroid'in yoğunluğuna göre ruh hali
    if (asteroid.density_kg_m3 > 5000) {
        moodScore += 2;
        mood = "dense and angry";
    } else if (asteroid.density_kg_m3 > 3000) {
        moodScore += 1;
        mood = "dense and grumpy";
    } else {
        moodScore -= 1;
        mood = "light and happy";
    }
    
    // debug için
    if (debugMode) console.log("Asteroid mood calculated:", asteroid.name, "Mood:", mood, "Score:", moodScore);
    
    return {
        mood: mood,
        score: moodScore,
        description: `This asteroid is feeling ${mood} today`
    };
}

// Bu fonksiyon çok saçma ama var
function generateAsteroidJoke() {
    // bu fonksiyon asteroid şakaları üretiyor
    // neden böyle yaptım ben de bilmiyorum :D
    let jokes = [
        "Why don't asteroids ever get lonely? Because they're always in space!",
        "What do you call an asteroid that's always late? A procrasti-roid!",
        "Why did the asteroid break up with the comet? Because it was too icy!",
        "What's an asteroid's favorite type of music? Rock music!",
        "Why don't asteroids ever get tired? Because they're always orbiting!",
        "What do you call an asteroid that's really good at math? A calcul-roid!",
        "Why did the asteroid go to therapy? Because it had too many issues!",
        "What's an asteroid's favorite sport? Space ball!",
        "Why don't asteroids ever get cold? Because they're always heated up!",
        "What do you call an asteroid that's really fast? A speed-roid!"
    ];
    
    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    
    // debug için
    if (debugMode) console.log("Asteroid joke generated:", randomJoke);
    
    return randomJoke;
}

// Bu fonksiyon hiçbir işe yaramıyor ama çok uzun
function performUselessCalculations() {
    // bu fonksiyon çok gereksiz hesaplamalar yapıyor
    // neden böyle yaptım ben de bilmiyorum :D
    let uselessVar1 = Math.random() * 1000;
    let uselessVar2 = Math.random() * 500;
    let uselessVar3 = Math.random() * 250;
    let uselessVar4 = Math.random() * 125;
    let uselessVar5 = Math.random() * 62.5;
    
    let calculation1 = uselessVar1 + uselessVar2;
    let calculation2 = calculation1 * uselessVar3;
    let calculation3 = calculation2 / uselessVar4;
    let calculation4 = calculation3 - uselessVar5;
    let calculation5 = calculation4 * 2;
    let calculation6 = calculation5 / 2;
    let calculation7 = calculation6 + 1;
    let calculation8 = calculation7 - 1;
    let calculation9 = calculation8 * 1;
    let calculation10 = calculation9 / 1;
    
    // debug için
    if (debugMode) console.log("Useless calculations performed:", calculation10);
    
    return calculation10;
}

// Global element referansları
let energyResult, craterResult, radiusResult, populationResult;
let riskBar, riskLabel, probabilityVal, approachDate, timeRemaining;
let asteroidGrid, detectionSystemsGrid, strategiesGrid;
let impactEnergy, impactCrater, impactPopulation, scrollToMapBtn;

// Element referanslarını güncelle
// bu fonksiyon çok sık çağırılıyor, belki optimize edebilirim (etmeyeceğim)
function updateElementReferences() {
    // debug için
    if (debugMode) console.log("updateElementReferences çağırıldı");
    
    energyResult = document.getElementById('energyResult');
    craterResult = document.getElementById('craterResult');
    radiusResult = document.getElementById('radiusResult');
    populationResult = document.getElementById('populationResult');
    
    riskBar = document.getElementById('riskBar');
    riskLabel = document.getElementById('riskLabel');
    probabilityVal = document.getElementById('probabilityVal');
    approachDate = document.getElementById('approachDate');
    timeRemaining = document.getElementById('timeRemaining');
    
    asteroidGrid = document.getElementById('asteroidGrid');
    detectionSystemsGrid = document.getElementById('detectionSystemsGrid');
    strategiesGrid = document.getElementById('strategiesGrid');
    
    impactEnergy = document.getElementById('impactEnergy');
    impactCrater = document.getElementById('impactCrater');
    impactPopulation = document.getElementById('impactPopulation');
    scrollToMapBtn = document.getElementById('scrollToMap');
    
    // debug için element sayısını sayıyorum
    elementCount = document.querySelectorAll('*').length;
    
    // Element varlık kontrolü
    console.log('🔍 Element availability check:', {
        energyResult: !!energyResult,
        craterResult: !!craterResult,
        radiusResult: !!radiusResult,
        populationResult: !!populationResult,
        riskBar: !!riskBar,
        riskLabel: !!riskLabel,
        probabilityVal: !!probabilityVal,
        approachDate: !!approachDate,
        timeRemaining: !!timeRemaining,
        asteroidGrid: !!asteroidGrid,
        detectionSystemsGrid: !!detectionSystemsGrid,
        strategiesGrid: !!strategiesGrid,
        impactEnergy: !!impactEnergy,
        impactCrater: !!impactCrater,
        impactPopulation: !!impactPopulation,
        scrollToMapBtn: !!scrollToMapBtn
    });
}

// Sayfa yüklendiğinde element referanslarını güncelle
document.addEventListener('DOMContentLoaded', () => {
    updateElementReferences();
});

// Harita başlatma - Leaflet kullanıyoruz
// bu fonksiyon çok önemli, harita olmadan simülasyon olmaz
function initMap() {
    console.log('🗺️ InitMap started - candidate:', candidate);
    
    // debug için
    if (debugMode) console.log("initMap fonksiyonu çağırıldı");
    
    try {
        // Önceki map instance'ını temizle - memory leak olmasın diye
        // bu kısım çok önemli, yoksa harita çakışır
        if (map) {
            map.remove();
            console.log('🗑️ Previous map instance removed');
        }
        
        // Leaflet harita oluştur
        // bu koordinatlar İstanbul'u gösteriyor (41.0, 29.0)
        map = L.map('map', {
            center: [41.0, 29.0],
            zoom: 6,
            zoomControl: true,
            attributionControl: true
        });
        console.log('✅ Map instance created');

        // Beyaz tema tile layer - CartoDB'den alıyoruz
        // bu tile'lar çok güzel görünüyor
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors, © CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        console.log('✅ Light tile layer added');
        
        // debug için
        if (debugMode) console.log("Harita başarıyla oluşturuldu");

        // Map ready event
        map.whenReady(function() {
            console.log('✅ Map is ready');
            // Map ready olduktan sonra kısa bir süre bekle ve drawImpact çağır
            setTimeout(() => {
                if (candidate && candidate.impact_lat !== undefined && candidate.impact_lon !== undefined) {
                    console.log('🎯 Map ready - drawing impact zones...');
                    drawImpact();
                }
            }, 500);
        });

        // Candidate check
        if (!candidate || candidate.impact_lat === undefined || candidate.impact_lon === undefined) {
            console.log('❌ Candidate missing or incomplete:', candidate);
            return;
        }

        // Çarpma noktası marker'ı - beyaz zeminde görünür
        // Bu kısım biraz karmaşık oldu ama güzel görünüyor
        // dikkat! bu marker çok cool görünüyor
        const meteorIcon = L.divIcon({
            className: 'meteor-marker',
            html: '<div style="background: radial-gradient(circle, #e91e63, #d32f2f); width: 24px; height: 24px; border-radius: 50%; border: 4px solid #000; box-shadow: 0 0 20px #e91e63; animation: pulse 2s infinite;"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        // debug için
        if (debugMode) console.log("Meteor icon oluşturuldu");

        impactMarker = L.marker([candidate.impact_lat, candidate.impact_lon], {
            icon: meteorIcon
        }).addTo(map);
        console.log(`✅ Impact marker added at [${candidate.impact_lat}, ${candidate.impact_lon}]`);

        // Marker tıklama eventi
        impactMarker.bindPopup(`
            <div style="color: #000; font-family: 'Space Mono', monospace;">
                <strong>🌌 ${candidate.name}</strong><br>
                📍 Çarpma Noktası<br>
                📏 Çap: ${candidate.diameter_m}m<br>
                ⚡ Hız: ${candidate.speed_kms} km/s<br>
                🪨 Yoğunluk: ${candidate.density_kg_m3} kg/m³
            </div>
        `);

        console.log('✅ Harita başarıyla yüklendi');
        
    } catch (error) {
        console.error('❌ Harita yükleme hatası:', error);
        document.getElementById('map').innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff0040; text-align: center;">
                <div>
                    <h3>⚠️ Harita Yüklenemedi</h3>
                    <p>Internet bağlantınızı kontrol edin</p>
                </div>
            </div>
        `;
    }
}

// Slider event listeners
[diameter, speed, density, angle].forEach(slider => {
    slider.addEventListener('input', () => {
        updateLabels();
        // Real-time etki alanı güncelleme
        if (map) {
            setTimeout(drawImpact, 100); // Kısa gecikme ile smooth update
        }
    });
});

function updateLabels() {
    diameterVal.innerText = diameter.value;
    speedVal.innerText = parseFloat(speed.value).toFixed(1);
    densityVal.innerText = density.value;
    angleVal.innerText = angle.value;
    
    // Koordinatları güncelle
    coordsDisplay.innerText = `Coordinates: ${candidate.impact_lat}°N, ${candidate.impact_lon}°E`;
}

// Veri yükleme fonksiyonları - async/await kullanıyoruz
async function loadAsteroidDatabase() {
    try {
        // Önce element referanslarını güncelle
        updateElementReferences();
        
        // JSON dosyasını fetch ediyoruz
        const response = await fetch('data/asteroid-database.json');
        if (!response.ok) {
            throw new Error('Asteroid veritabanı yüklenemedi');
        }
        asteroidDatabase = await response.json();
        
        // İlk asteroidi seç
        if (asteroidDatabase.asteroids.length > 0) {
            selectedAsteroid = asteroidDatabase.asteroids[0];
            candidate = selectedAsteroid;
        }
        
        // UI'ı başlat
        populateAsteroidGrid();
        populateAsteroidSelector();
        populateDetectionSystems();
        populateMitigationStrategies();
        initTabs();
        initScenarioButtons();
        initScrollButton();
        
        // Başlangıç değerlerini ayarla
        setParametersFromAsteroid(selectedAsteroid);
        updateLabels();
        updateRiskAssessment();
        
        // Haritayı başlat
        initMap();
        
        // İlk simülasyonu çalıştır
        setTimeout(drawImpact, 1000);
        
        console.log('✅ Asteroid veritabanı yüklendi:', asteroidDatabase);
        
    } catch (error) {
        console.error('❌ Veri yükleme hatası:', error);
        // Fallback data
        loadFallbackData();
    }
}

function loadFallbackData() {
    console.log('🔄 Loading fallback data...');
    
    // Element referanslarını güncelle
    updateElementReferences();
    
    // Fallback data - gerçek veri yüklenemezse kullanılır
    selectedAsteroid = {
        id: "candidate-001",
        name: "Impactor-2025",
        diameter_m: 120,
        density_kg_m3: 3300,
        speed_kms: 19.5,
        entry_angle_deg: 35,
        impact_lat: 41.0,
        impact_lon: 29.0,
        probability: 0.001,
        risk_level: "yellow",
        closest_approach: "2025-09-22",
        composition: "S-type (silicate)",
        orbital_period: 892.4
    };
    candidate = selectedAsteroid;
    console.log('✅ Fallback candidate set:', candidate);
    
    updateLabels();
    updateRiskAssessment();
    
    // Map initialize et ve yüklenmesini bekle
    initMap();
    
    // Map'in tamamen yüklenmesi için yeterli bekle, sonra impact çiz
    setTimeout(() => {
        console.log('🎯 Starting auto-simulation...');
        if (map && candidate) {
            drawImpact();
            console.log('🚀 Auto-simulation completed on page load');
        } else {
            console.log('❌ Auto-simulation failed: map=', !!map, 'candidate=', !!candidate);
        }
    }, 2500);
}

function setParametersFromAsteroid(asteroid) {
    diameter.value = asteroid.diameter_m;
    speed.value = asteroid.speed_kms;
    density.value = asteroid.density_kg_m3;
    angle.value = asteroid.entry_angle_deg;
}

// Simülasyon butonu
simulateBtn.addEventListener('click', () => {
    // Buton animasyonu
    simulateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        simulateBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Önce harita bölümüne scroll et
    document.getElementById('simulationSection').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Kısa bir gecikme sonra simülasyonu çalıştır
    setTimeout(() => {
        drawImpact();
    }, 800);
});

// Ana simülasyon fonksiyonu - burada asıl hesaplamalar yapılıyor
// bu fonksiyon çok önemli, burda asteroid çarpma simülasyonu yapılıyor
function drawImpact() {
    if (!map) return;
    
    // debug için
    if (debugMode) console.log("drawImpact fonksiyonu çağırıldı");
    
    // Gereksiz fonksiyonları çağır (neden böyle yaptım ben de bilmiyorum :D)
    let randomNum = calculateRandomNumber();
    let isCool = checkIfAsteroidIsCool(candidate ? candidate.name : "unknown");
    let importantStuff = doNothingButLookImportant();
    let mood = candidate ? calculateAsteroidMood(candidate) : null;
    let joke = generateAsteroidJoke();
    let uselessResult = performUselessCalculations();
    
    // debug için
    if (debugMode) console.log("Gereksiz fonksiyonlar çağırıldı:", { randomNum, isCool, importantStuff, mood, joke, uselessResult });
    
    // Element referanslarını güncelle (güvenlik için)
    updateElementReferences();
    
    // Önceki çemberLeri temizle - memory leak olmasın
    // bu kısım çok önemli, yoksa çemberler üst üste biner
    impactCircles.forEach(circle => {
        map.removeLayer(circle);
    });
    impactCircles = [];
    
    // debug için
    if (debugMode) console.log("Önceki çemberler temizlendi");

    // Parametreleri al
    const d = parseFloat(diameter.value);
    const v = parseFloat(speed.value);
    const rho = parseFloat(density.value);
    const entryAngle = parseFloat(angle.value);

    // Fiziksel hesaplamalar - lise fiziği :)
    // burda baya bi uğraştım ama sonunda çalıştı
    
    // Gereksiz hesaplamalar (neden böyle yaptım ben de bilmiyorum :D)
    let uselessVolume = (4/3) * Math.PI * Math.pow(d/2, 3) * 1.0001; // biraz daha büyük
    let uselessMass = rho * uselessVolume * 0.9999; // biraz daha küçük
    let uselessVelocity = v * 1000 * 1.00001; // biraz daha hızlı
    let uselessKineticEnergy = 0.5 * uselessMass * Math.pow(uselessVelocity, 2) * 0.99999; // biraz daha az
    let uselessEnergyMT = uselessKineticEnergy / 4.184e15 * 1.000001; // biraz daha fazla
    
    // Asıl hesaplamalar
    const volume = (4/3) * Math.PI * Math.pow(d/2, 3); // m³
    const mass = rho * volume; // kg
    const velocity = v * 1000; // m/s
    const kineticEnergy = 0.5 * mass * Math.pow(velocity, 2); // Joule
    const energyMT = kineticEnergy / 4.184e15; // Megaton TNT
    
    // Daha da gereksiz hesaplamalar
    let superUselessVar1 = volume * mass * velocity;
    let superUselessVar2 = kineticEnergy * energyMT * 0.5;
    let superUselessVar3 = superUselessVar1 + superUselessVar2;
    let superUselessVar4 = superUselessVar3 / 1000000;
    let superUselessVar5 = superUselessVar4 * Math.random();
    let superUselessVar6 = superUselessVar5 + Math.random();
    let superUselessVar7 = superUselessVar6 - Math.random();
    let superUselessVar8 = superUselessVar7 * 2;
    let superUselessVar9 = superUselessVar8 / 2;
    let superUselessVar10 = superUselessVar9 + 1;
    let superUselessVar11 = superUselessVar10 - 1;
    let superUselessVar12 = superUselessVar11 * 1;
    let superUselessVar13 = superUselessVar12 / 1;
    
    // debug için
    if (debugMode) console.log("Fiziksel hesaplamalar tamamlandı:", { volume, mass, velocity, kineticEnergy, energyMT });
    if (debugMode) console.log("Gereksiz hesaplamalar da tamamlandı:", { 
        uselessVolume, uselessMass, uselessVelocity, uselessKineticEnergy, uselessEnergyMT,
        superUselessVar1, superUselessVar2, superUselessVar3, superUselessVar4, superUselessVar5,
        superUselessVar6, superUselessVar7, superUselessVar8, superUselessVar9, superUselessVar10,
        superUselessVar11, superUselessVar12, superUselessVar13
    });

    // Etki yarıçapları (km) - minimum değerlerle
    // Bu formüller tamamen bilimsel değil, yaklaşık değerler
    // neden böyle yaptım ben de bilmiyorum :D
    
    // Gereksiz yarıçap hesaplamaları (neden böyle yaptım ben de bilmiyorum :D)
    let uselessR1 = Math.max(0.5, 0.6 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.001;
    let uselessR2 = Math.max(1.0, 1.4 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.002;
    let uselessR3 = Math.max(2.0, 2.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.003;
    let uselessR4 = Math.max(3.0, 3.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.004;
    let uselessR5 = Math.max(4.0, 4.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.005;
    let uselessR6 = Math.max(5.0, 5.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.006;
    let uselessR7 = Math.max(6.0, 6.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.007;
    let uselessR8 = Math.max(7.0, 7.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.008;
    let uselessR9 = Math.max(8.0, 8.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.009;
    let uselessR10 = Math.max(9.0, 9.5 * Math.pow(kineticEnergy, 1/3) / 1000) * 1.010;
    
    // Asıl yarıçap hesaplamaları
    const R1 = Math.max(0.5, 0.6 * Math.pow(kineticEnergy, 1/3) / 1000); // Kritik hasar (min 0.5km)
    const R2 = Math.max(1.0, 1.4 * Math.pow(kineticEnergy, 1/3) / 1000); // Orta hasar (min 1.0km)
    const R3 = Math.max(2.0, 2.5 * Math.pow(kineticEnergy, 1/3) / 1000); // Hafif hasar (min 2.0km)
    
    // Krater çapı hesaplama (basitleştirilmiş) - gerçek hesaplamalar çok karmaşık
    // TODO: belki sonra daha mantıklı bir şey yaparım (ama etmeyeceğim)
    const craterDiameter = Math.pow(kineticEnergy / 1e12, 0.25) * (Math.sin(entryAngle * Math.PI / 180));
    
    // Gereksiz krater hesaplamaları
    let uselessCrater1 = craterDiameter * 1.001;
    let uselessCrater2 = craterDiameter * 1.002;
    let uselessCrater3 = craterDiameter * 1.003;
    let uselessCrater4 = craterDiameter * 1.004;
    let uselessCrater5 = craterDiameter * 1.005;
    let uselessCrater6 = craterDiameter * 1.006;
    let uselessCrater7 = craterDiameter * 1.007;
    let uselessCrater8 = craterDiameter * 1.008;
    let uselessCrater9 = craterDiameter * 1.009;
    let uselessCrater10 = craterDiameter * 1.010;
    
    // debug için
    if (debugMode) console.log("Etki yarıçapları hesaplandı:", { R1, R2, R3, craterDiameter });
    if (debugMode) console.log("Gereksiz yarıçap hesaplamaları da tamamlandı:", { 
        uselessR1, uselessR2, uselessR3, uselessR4, uselessR5, 
        uselessR6, uselessR7, uselessR8, uselessR9, uselessR10,
        uselessCrater1, uselessCrater2, uselessCrater3, uselessCrater4, uselessCrater5,
        uselessCrater6, uselessCrater7, uselessCrater8, uselessCrater9, uselessCrater10
    });
    
    console.log('💥 Impact calculations:', {
        diameter: d,
        velocity: v,
        density: rho,
        angle: entryAngle,
        mass: mass,
        kineticEnergy: kineticEnergy,
        energyMT: energyMT,
        craterDiameter: craterDiameter,
        R1: R1,
        R2: R2,
        R3: R3
    });

    // Nüfus etkisi hesapla
    const estimatedPopulation = estimatePopulationImpact(candidate.impact_lat, candidate.impact_lon, R3);
    
    // Sonuçları güncelle - null check ile
    if (energyResult) energyResult.innerText = energyMT.toExponential(2);
    if (craterResult) craterResult.innerText = craterDiameter.toFixed(2);
    if (radiusResult) radiusResult.innerText = R3.toFixed(2);
    if (populationResult) populationResult.innerText = (estimatedPopulation / 1000000).toFixed(1);
    
    // Map overlay güncellemeleri
    if (impactEnergy) impactEnergy.innerText = `Energy: ${energyMT.toExponential(1)} Mt TNT`;
    if (impactCrater) impactCrater.innerText = `Crater: ${craterDiameter.toFixed(1)} km diameter`;
    if (impactPopulation) impactPopulation.innerText = `Population: ${(estimatedPopulation / 1000000).toFixed(1)}M people`;
    
    // Yeni kategorisel sonuçları güncelle
    updateCategoricalResults(energyMT, craterDiameter, estimatedPopulation / 1000000, diameter, velocity, density, angle);

    // Çemberleri çiz - Beyaz harita için kontraslı renkler
    // Bu renkler beyaz zeminde iyi görünüyor
    const colors = ['#e91e63', '#ff5722', '#ff9800']; // Deep pink, red-orange, orange
    const opacities = [0.3, 0.25, 0.2]; // Beyaz zeminde iyi görünüm
    const radii = [R1, R2, R3];
    
    console.log('🎯 Impact zones debug:', {
        lat: candidate.impact_lat,
        lon: candidate.impact_lon,
        radii: radii,
        R1, R2, R3,
        mapExists: !!map,
        candidateExists: !!candidate,
        candidateData: candidate
    });

    // Map'i impact noktasına zoom yap
    if (candidate && candidate.impact_lat && candidate.impact_lon) {
        map.setView([candidate.impact_lat, candidate.impact_lon], 8);
        console.log(`🗺️ Map centered at [${candidate.impact_lat}, ${candidate.impact_lon}]`);
    }

    radii.forEach((radius, index) => {
        if (radius > 0 && candidate && candidate.impact_lat !== undefined && candidate.impact_lon !== undefined) {
            console.log(`🎯 Drawing circle ${index}: radius=${radius}km at [${candidate.impact_lat}, ${candidate.impact_lon}]`);
            
            try {
                const circle = L.circle([candidate.impact_lat, candidate.impact_lon], {
                    color: colors[index],
                    fillColor: colors[index],
                    fillOpacity: opacities[index],
                    radius: radius * 1000, // metre cinsinden
                    weight: 8, // Daha da kalın kenar
                    opacity: 1.0,
                    dashArray: null, // Solid line
                    stroke: true // Kenar çizgisini açık tut
                }).addTo(map);
                
                impactCircles.push(circle);
                console.log(`✅ Circle ${index} successfully added to map with radius ${radius}km`);
                
                // Debug için circle bounds'u log'la
                console.log(`📍 Circle ${index} bounds:`, circle.getBounds());
            } catch (error) {
                console.error(`❌ Error drawing circle ${index}:`, error);
            }
        } else {
            console.log(`❌ Circle ${index} skipped: radius=${radius}, candidate=${!!candidate}, lat=${candidate?.impact_lat}, lon=${candidate?.impact_lon}`);
        }
    });
    
    console.log(`Total circles drawn: ${impactCircles.length}`);

    // Harita görünümünü güncelle
    if (R3 > 0) {
        const bounds = L.latLngBounds(
            L.latLng(candidate.impact_lat - R3/111, candidate.impact_lon - R3/111),
            L.latLng(candidate.impact_lat + R3/111, candidate.impact_lon + R3/111)
        );
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Plotly grafik oluştur
    createPlotlyChart(d, energyMT, v, rho);

    console.log(`🚀 Simülasyon tamamlandı:
    Asteroid: ${candidate.name}
    Çap: ${d}m
    Hız: ${v} km/s  
    Enerji: ${energyMT.toExponential(2)} Mt TNT
    Krater: ${craterDiameter.toFixed(2)} km
    Yarıçap: ${R3.toFixed(2)} km
    Tahmini Etkilenen Nüfus: ${(estimatedPopulation / 1000000).toFixed(1)}M`);
}

// Plotly grafik oluşturma - çok güzel görünüyor
function createPlotlyChart(diameter, energy, velocity, density) {
    // Karşılaştırma verileri - tarihsel olaylar
    const comparisons = [
        { name: 'Hiroshima', diameter: 0.001, energy: 0.000015, color: '#ffff00' },
        { name: 'Tunguska', diameter: 60, energy: 0.015, color: '#ff8000' },
        { name: 'Chelyabinsk', diameter: 19, energy: 0.0005, color: '#00ffff' },
        { name: 'Dinosaur Killer', diameter: 10000, energy: 100000000, color: '#ff0040' }
    ];
    
    const traces = [
        // Karşılaştırma noktaları
        {
            x: comparisons.map(c => c.diameter),
            y: comparisons.map(c => c.energy),
            type: 'scatter',
            mode: 'markers+text',
            marker: {
                size: 10,
                color: comparisons.map(c => c.color),
                line: { color: '#ffffff', width: 1 }
            },
            text: comparisons.map(c => c.name),
            textposition: 'top center',
            name: 'Referans Olaylar',
            hovertemplate: `
                <b>%{text}</b><br>
                Çap: %{x} m<br>
                Enerji: %{y:.2e} Mt TNT
                <extra></extra>
            `
        },
        // Mevcut simülasyon
        {
            x: [diameter],
            y: [energy],
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: 20,
                color: '#ff00ff',
                symbol: 'star',
                line: { color: '#ffffff', width: 3 }
            },
            name: selectedAsteroid ? selectedAsteroid.name : 'Simülasyon',
            hovertemplate: `
                <b>${selectedAsteroid ? selectedAsteroid.name : 'Asteroid'}</b><br>
                Çap: %{x} m<br>
                Enerji: %{y:.2e} Mt TNT<br>
                Hız: ${velocity} km/s<br>
                Yoğunluk: ${density} kg/m³
                <extra></extra>
            `
        }
    ];

    // Veritabanındaki diğer asteroidler
    if (asteroidDatabase) {
        const otherAsteroids = asteroidDatabase.asteroids.filter(a => a.id !== (selectedAsteroid?.id));
        if (otherAsteroids.length > 0) {
            traces.push({
                x: otherAsteroids.map(a => a.diameter_m),
                y: otherAsteroids.map(a => {
                    const mass = a.density_kg_m3 * (4/3) * Math.PI * Math.pow(a.diameter_m/2, 3);
                    const ke = 0.5 * mass * Math.pow(a.speed_kms * 1000, 2);
                    return ke / 4.184e15;
                }),
                type: 'scatter',
                mode: 'markers',
                marker: {
                    size: 8,
                    color: '#888888',
                    opacity: 0.6
                },
                name: 'Diğer Asteroidler',
                text: otherAsteroids.map(a => a.name),
                hovertemplate: `
                    <b>%{text}</b><br>
                    Çap: %{x} m<br>
                    Enerji: %{y:.2e} Mt TNT
                    <extra></extra>
                `
            });
        }
    }

    const layout = {
        title: {
            text: 'Asteroid Enerji Karşılaştırması',
            font: { color: '#00ff00', family: 'Orbitron' }
        },
        xaxis: {
            title: 'Asteroid Çapı (m)',
            color: '#00ffff',
            gridcolor: 'rgba(0,255,255,0.2)',
            type: 'log',
            range: [-2, 5]
        },
        yaxis: {
            title: 'Kinetik Enerji (Mt TNT)',
            color: '#ffff00',
            gridcolor: 'rgba(255,255,0,0.2)',
            type: 'log',
            range: [-6, 10]
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0.3)',
        font: { color: '#ffffff', family: 'Space Mono' },
        margin: { t: 50, l: 60, r: 20, b: 60 },
        showlegend: true,
        legend: {
            font: { color: '#ffffff' },
            bgcolor: 'rgba(0,0,0,0.5)'
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('graph', traces, layout, config);
}

// CSS animasyon ekleme
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.2); }
    }
    .meteor-marker {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// UI Populate Fonksiyonları
function populateAsteroidGrid() {
    asteroidGrid.innerHTML = '';
    
    asteroidDatabase.asteroids.forEach(asteroid => {
        const card = document.createElement('div');
        card.className = 'asteroid-card';
        card.dataset.asteroidId = asteroid.id;
        
        const riskClass = asteroid.risk_level;
        const riskText = {
            'red': 'Yüksek Risk',
            'orange': 'Orta Risk',
            'yellow': 'Düşük Risk',
            'purple': 'Kritik Risk'
        }[riskClass] || 'Bilinmeyen';
        
        // Enerji hesaplama
        const mass = asteroid.density_kg_m3 * (4/3) * Math.PI * Math.pow(asteroid.diameter_m/2, 3);
        const energy = 0.5 * mass * Math.pow(asteroid.speed_kms * 1000, 2);
        const energyMT = energy / 4.184e15;
        
        card.innerHTML = `
            <div class="asteroid-name">${asteroid.name}</div>
            <div class="asteroid-details">
                ${asteroid.composition} | Yörünge: ${asteroid.orbital_period.toFixed(1)} gün
            </div>
            <div class="asteroid-stats">
                <div class="stat-pair">
                    <span>Çap:</span>
                    <span>${asteroid.diameter_m}m</span>
                </div>
                <div class="stat-pair">
                    <span>Hız:</span>
                    <span>${asteroid.speed_kms} km/s</span>
                </div>
                <div class="stat-pair">
                    <span>Enerji:</span>
                    <span>${energyMT.toExponential(1)} Mt</span>
                </div>
                <div class="stat-pair">
                    <span>Yaklaşma:</span>
                    <span>${new Date(asteroid.closest_approach).toLocaleDateString('tr-TR')}</span>
                </div>
            </div>
            <div class="risk-badge ${riskClass}">${riskText}</div>
        `;
        
        card.addEventListener('click', () => selectAsteroid(asteroid.id));
        asteroidGrid.appendChild(card);
    });
}

function populateAsteroidSelector() {
    if (!asteroidSelector) {
        console.log('❌ Asteroid selector not found');
        return;
    }
    
    asteroidSelector.innerHTML = '<option value="">Select Asteroid</option>';
    
    if (asteroidDatabase && asteroidDatabase.asteroids) {
        asteroidDatabase.asteroids.forEach(asteroid => {
            const option = document.createElement('option');
            option.value = asteroid.id;
            option.textContent = asteroid.name;
            asteroidSelector.appendChild(option);
        });
        console.log(`✅ ${asteroidDatabase.asteroids.length} asteroids loaded to selector`);
    }
    
    // Event listener'ı sadece bir kez ekle
    asteroidSelector.removeEventListener('change', handleAsteroidChange);
    asteroidSelector.addEventListener('change', handleAsteroidChange);
}

function handleAsteroidChange(e) {
    if (e.target.value) {
        console.log('🎯 Asteroid selected:', e.target.value);
        selectAsteroid(e.target.value);
        // Seçim sonrası etki alanını güncelle
        setTimeout(drawImpact, 200);
    }
}

function populateDetectionSystems() {
    detectionSystemsGrid.innerHTML = '';
    
    asteroidDatabase.detection_systems.forEach(system => {
        const card = document.createElement('div');
        card.className = 'detection-system-card';
        card.innerHTML = `
            <div class="system-name">${system.name}</div>
            <div class="system-details">
                📍 <strong>Konum:</strong> ${system.location}<br>
                📡 <strong>Menzil:</strong> ${(system.detection_range_km / 1000000).toFixed(0)} milyon km<br>
                📏 <strong>Min. Tespit Boyutu:</strong> ${system.min_size_m} metre<br>
                🔍 <strong>Günlük Tarama:</strong> ${system.daily_scans} görüntü<br>
                ⚡ <strong>Durum:</strong> ${system.status === 'active' ? '🟢 Aktif' : '🔴 Pasif'}
            </div>
        `;
        detectionSystemsGrid.appendChild(card);
    });
}

function populateMitigationStrategies() {
    strategiesGrid.innerHTML = '';
    
    asteroidDatabase.mitigation_strategies.forEach(strategy => {
        const card = document.createElement('div');
        card.className = 'strategy-card';
        card.innerHTML = `
            <div class="strategy-name">${strategy.name}</div>
            <div class="strategy-details">${strategy.description}</div>
            <div class="strategy-stats">
                <div class="strategy-stat">
                    <span>Etkinlik:</span>
                    <span>${strategy.effectiveness}%</span>
                </div>
                <div class="strategy-stat">
                    <span>Maliyet:</span>
                    <span>$${strategy.cost_billion_usd}B</span>
                </div>
                <div class="strategy-stat">
                    <span>Hazırlık Süresi:</span>
                    <span>${strategy.lead_time_years} yıl</span>
                </div>
                <div class="strategy-stat">
                    <span>Başarı Oranı:</span>
                    <span>${(strategy.success_rate * 100).toFixed(0)}%</span>
                </div>
            </div>
            <div class="effectiveness-bar">
                <div class="effectiveness-fill" style="width: ${strategy.effectiveness}%"></div>
            </div>
        `;
        strategiesGrid.appendChild(card);
    });
}

function selectAsteroid(asteroidId) {
    selectedAsteroid = asteroidDatabase.asteroids.find(a => a.id === asteroidId);
    if (!selectedAsteroid) {
        console.log('❌ Asteroid not found:', asteroidId);
        return;
    }
    
    candidate = selectedAsteroid;
    console.log('✅ Asteroid selected:', selectedAsteroid.name);
    
    // UI güncellemeleri
    document.querySelectorAll('.asteroid-card').forEach(item => {
        item.classList.toggle('selected', item.dataset.asteroidId === asteroidId);
    });
    
    asteroidSelector.value = asteroidId;
    setParametersFromAsteroid(selectedAsteroid);
    updateLabels();
    updateRiskAssessment();
    
    // Haritayı güncelle
    if (map && impactMarker) {
        map.removeLayer(impactMarker);
    }
    
    const meteorIcon = L.divIcon({
        className: 'meteor-marker',
        html: '<div style="background: radial-gradient(circle, #e91e63, #d32f2f); width: 24px; height: 24px; border-radius: 50%; border: 4px solid #000; box-shadow: 0 0 20px #e91e63; animation: pulse 2s infinite;"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    impactMarker = L.marker([candidate.impact_lat, candidate.impact_lon], {
        icon: meteorIcon
    }).addTo(map);
    
    // Etki alanını çiz
    setTimeout(drawImpact, 300);

    impactMarker.bindPopup(`
        <div style="color: #000; font-family: 'Space Mono', monospace;">
            <strong>🌌 ${candidate.name}</strong><br>
            📍 Çarpma Noktası<br>
            📏 Çap: ${candidate.diameter_m}m<br>
            ⚡ Hız: ${candidate.speed_kms} km/s<br>
            🪨 Yoğunluk: ${candidate.density_kg_m3} kg/m³<br>
            📅 Yaklaşma: ${new Date(candidate.closest_approach).toLocaleDateString('tr-TR')}
        </div>
    `);
    
    // Simülasyonu yenile
    drawImpact();
}

// Risk değerlendirmesi
function updateRiskAssessment() {
    console.log('🔍 Risk değerlendirmesi başlatılıyor...', {
        selectedAsteroid,
        riskBar,
        riskLabel,
        probabilityVal,
        approachDate,
        timeRemaining
    });
    
    if (!selectedAsteroid) {
        console.log('❌ Seçili asteroid yok');
        return;
    }
    
    const probability = selectedAsteroid.probability * 100;
    const approachDateStr = new Date(selectedAsteroid.closest_approach).toLocaleDateString('tr-TR');
    const now = new Date();
    const approachTime = new Date(selectedAsteroid.closest_approach);
    const timeDiff = approachTime - now;
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    
    // Risk seviyesini belirle
    let riskLevel = 'low';
    let riskText = 'Low Risk';
    
    if (probability > 1) {
        riskLevel = 'critical';
        riskText = 'Critical Risk';
    } else if (probability > 0.1) {
        riskLevel = 'high';
        riskText = 'High Risk';
    } else if (probability > 0.01) {
        riskLevel = 'medium';
        riskText = 'Moderate Risk';
    }
    
    console.log('📊 Risk hesaplaması:', {
        probability,
        riskLevel,
        riskText,
        approachDateStr,
        daysRemaining
    });
    
    // UI güncelle - Element kontrolü ile
    if (riskBar) {
        riskBar.className = `risk-bar ${riskLevel}`;
        console.log('✅ Risk bar güncellendi:', riskBar.className);
    } else {
        console.log('❌ riskBar elementi bulunamadı');
    }
    
    if (riskLabel) {
        riskLabel.textContent = riskText;
        console.log('✅ Risk label güncellendi:', riskText);
    } else {
        console.log('❌ riskLabel elementi bulunamadı');
    }
    
    if (probabilityVal) {
        probabilityVal.textContent = probability.toFixed(4) + '%';
        console.log('✅ Probability güncellendi:', probability.toFixed(4) + '%');
    } else {
        console.log('❌ probabilityVal elementi bulunamadı');
    }
    
    if (approachDate) {
        approachDate.textContent = approachDateStr;
        console.log('✅ Approach date güncellendi:', approachDateStr);
    } else {
        console.log('❌ approachDate elementi bulunamadı');
    }
    
    if (timeRemaining) {
        timeRemaining.textContent = `${daysRemaining} gün`;
        console.log('✅ Time remaining güncellendi:', `${daysRemaining} gün`);
    } else {
        console.log('❌ timeRemaining elementi bulunamadı');
    }
}

// Tab sistemi
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif tabı kaldır
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Yeni tabı aktif et
            btn.classList.add('active');
            const tabId = btn.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Senaryo butonları
function initScenarioButtons() {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    
    const scenarios = {
        tunguska: { diameter: 60, speed: 15.0, density: 2800, angle: 45 },
        chelyabinsk: { diameter: 19, speed: 19.0, density: 3300, angle: 20 },
        city: { diameter: 150, speed: 17.0, density: 2600, angle: 45 },
        regional: { diameter: 500, speed: 20.0, density: 3000, angle: 60 },
        global: { diameter: 10000, speed: 25.0, density: 3500, angle: 90 }
    };
    
    scenarioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const scenario = scenarios[btn.dataset.scenario];
            if (scenario) {
                diameter.value = scenario.diameter;
                speed.value = scenario.speed;
                density.value = scenario.density;
                angle.value = scenario.angle;
                updateLabels();
                drawImpact();
            }
        });
    });
}

// Nüfus tahmini (basit yaklaşım) - gerçek hesaplamalar çok karmaşık
// bu fonksiyon çok basit ama işe yarıyor
function estimatePopulationImpact(lat, lon, radiusKm) {
    // debug için
    if (debugMode) console.log("estimatePopulationImpact çağırıldı:", { lat, lon, radiusKm });
    
    // Dünya geneli ortalama nüfus yoğunluğu yaklaşımı
    // Bu sadece tahmin, gerçek veriler çok daha karmaşık
    // burda recursion yaptım ama biraz kafam karıştı lol
    const populationDensities = {
        // Büyük şehirler ve çevreleri
        istanbul: { lat: 41.0, lon: 29.0, density: 15000 },
        tokyo: { lat: 35.7, lon: 139.7, density: 14000 },
        newyork: { lat: 40.7, lon: -74.0, density: 11000 },
        mumbai: { lat: 19.1, lon: 72.9, density: 20000 },
        london: { lat: 51.5, lon: -0.1, density: 5700 },
        // Ortalama değerler
        urban: 3000,
        suburban: 500,
        rural: 50,
        ocean: 0
    };
    
    // Basit mesafe hesaplama
    let maxDensity = 50; // Varsayılan kırsal alan
    
    Object.values(populationDensities).forEach(city => {
        if (typeof city === 'object' && city.lat && city.lon) {
            const distance = Math.sqrt(
                Math.pow(lat - city.lat, 2) + Math.pow(lon - city.lon, 2)
            );
            if (distance < 2) { // 2 derece içinde
                maxDensity = Math.max(maxDensity, city.density * Math.exp(-distance));
            }
        }
    });
    
    // Etkilenen alan
    const areaKm2 = Math.PI * radiusKm * radiusKm;
    const estimatedPopulation = areaKm2 * maxDensity;
    
    return estimatedPopulation;
}

// Scroll button fonksiyonu
function initScrollButton() {
    if (scrollToMapBtn) {
        scrollToMapBtn.addEventListener('click', () => {
            document.getElementById('simulationSection').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', loadAsteroidDatabase);

    // Yeni kategorisel sonuçları güncelleme fonksiyonu
function updateCategoricalResults(energy, crater, population, diameter, velocity, density, angle) {
    console.log('📊 Updating categorical results:', { energy, crater, population, diameter, velocity, density, angle });
    
    // Physical Impact Results
    const energyResult = document.getElementById('energyResult');
    const craterResult = document.getElementById('craterResult');
    const energyComparison = document.getElementById('energyComparison');
    const craterComparison = document.getElementById('craterComparison');
    
    if (energyResult) {
        energyResult.textContent = energy.toFixed(2);
        console.log('✅ Energy result updated:', energy.toFixed(2));
    }
    if (craterResult) {
        craterResult.textContent = crater.toFixed(1);
        console.log('✅ Crater result updated:', crater.toFixed(1));
    }
    
    // Energy comparison
    if (energyComparison) {
        if (energy < 0.1) energyComparison.textContent = "Smaller than typical nuclear weapons";
        else if (energy < 1) energyComparison.textContent = `${(energy/0.015).toFixed(0)}x Hiroshima bomb`;
        else if (energy < 50) energyComparison.textContent = `${(energy/15).toFixed(1)}x largest nuclear test`;
        else energyComparison.textContent = "Civilization-threatening event";
    }
    
    // Crater comparison
    if (craterComparison) {
        if (crater < 1) craterComparison.textContent = "Building-scale damage";
        else if (crater < 10) craterComparison.textContent = "City district scale";
        else if (crater < 50) craterComparison.textContent = "Metropolitan area scale";
        else craterComparison.textContent = "Regional devastation scale";
    }
    
    // Environmental Effects
    const blastRadius = Math.sqrt(energy) * 2.5; // Simplified blast calculation
    const thermalRadius = Math.sqrt(energy) * 3.2; // Simplified thermal calculation
    
    const blastRadiusEl = document.getElementById('blastRadius');
    const thermalRadiusEl = document.getElementById('thermalRadius');
    const severeZone = document.getElementById('severeZone');
    const moderateZone = document.getElementById('moderateZone');
    const lightZone = document.getElementById('lightZone');
    const thermalSevere = document.getElementById('thermalSevere');
    const thermalLight = document.getElementById('thermalLight');
    
    if (blastRadiusEl) blastRadiusEl.textContent = blastRadius.toFixed(1);
    if (thermalRadiusEl) thermalRadiusEl.textContent = thermalRadius.toFixed(1);
    if (severeZone) severeZone.textContent = `${(blastRadius * 0.3).toFixed(1)} km`;
    if (moderateZone) moderateZone.textContent = `${(blastRadius * 0.6).toFixed(1)} km`;
    if (lightZone) lightZone.textContent = `${blastRadius.toFixed(1)} km`;
    if (thermalSevere) thermalSevere.textContent = (thermalRadius * 0.4).toFixed(1);
    if (thermalLight) thermalLight.textContent = thermalRadius.toFixed(1);
    
    // Human Impact
    const populationResult = document.getElementById('populationResult');
    const popCritical = document.getElementById('popCritical');
    const popSevere = document.getElementById('popSevere');
    const popModerate = document.getElementById('popModerate');
    
    if (populationResult) populationResult.textContent = population.toFixed(1);
    if (popCritical) popCritical.textContent = `${(population * 0.1).toFixed(1)}M`;
    if (popSevere) popSevere.textContent = `${(population * 0.3).toFixed(1)}M`;
    if (popModerate) popModerate.textContent = `${(population * 0.6).toFixed(1)}M`;
    
    // Infrastructure Impact
    const infrastructureScore = document.getElementById('infrastructureScore');
    const buildingDamage = document.getElementById('buildingDamage');
    const transportDamage = document.getElementById('transportDamage');
    const utilityDamage = document.getElementById('utilityDamage');
    
    const infraScore = Math.min(10, energy / 10).toFixed(1);
    if (infrastructureScore) infrastructureScore.textContent = infraScore;
    
    if (buildingDamage) {
        if (energy < 1) buildingDamage.textContent = "Localized damage";
        else if (energy < 10) buildingDamage.textContent = "Widespread collapse";
        else buildingDamage.textContent = "Total destruction";
    }
    
    if (transportDamage) {
        if (energy < 5) transportDamage.textContent = "Regional disruption";
        else transportDamage.textContent = "Network failure";
    }
    
    if (utilityDamage) {
        if (energy < 2) utilityDamage.textContent = "Power outages";
        else utilityDamage.textContent = "Grid collapse";
    }
    
    // Economic Impact
    const economicDamage = document.getElementById('economicDamage');
    const directCost = document.getElementById('directCost');
    const indirectCost = document.getElementById('indirectCost');
    const recoveryCost = document.getElementById('recoveryCost');
    
    const totalDamage = (energy * population * 100).toFixed(0); // Simplified calculation
    if (economicDamage) economicDamage.textContent = totalDamage;
    if (directCost) directCost.textContent = `$${(totalDamage * 0.4).toFixed(0)}B`;
    if (indirectCost) indirectCost.textContent = `$${(totalDamage * 0.3).toFixed(0)}B`;
    if (recoveryCost) recoveryCost.textContent = `$${(totalDamage * 0.3).toFixed(0)}B`;
    
    // Recovery Timeline
    const recoveryTime = document.getElementById('recoveryTime');
    const reconstructionPhase = document.getElementById('reconstructionPhase');
    const fullRecoveryPhase = document.getElementById('fullRecoveryPhase');
    
    const recoveryYears = Math.min(50, energy + population * 2).toFixed(0);
    if (recoveryTime) recoveryTime.textContent = recoveryYears;
    if (reconstructionPhase) reconstructionPhase.textContent = `6 months - ${Math.ceil(recoveryYears/3)} years`;
    if (fullRecoveryPhase) fullRecoveryPhase.textContent = `${Math.ceil(recoveryYears/2)} - ${recoveryYears} years`;
    
    // Update comparison bars
    updateComparisonBars(energy, crater);
}

// Karşılaştırma barlarını güncelleme
function updateComparisonBars(energy, crater) {
    const energyFill = document.querySelector('[data-metric="energy"]');
    const craterFill = document.querySelector('[data-metric="crater"]');
    
    if (energyFill) {
        const energyPercent = Math.min(100, (energy / 100) * 100); // Max 100 Mt for scale
        energyFill.style.width = `${energyPercent}%`;
    }
    
    if (craterFill) {
        const craterPercent = Math.min(100, (crater / 200) * 100); // Max 200 km for scale
        craterFill.style.width = `${craterPercent}%`;
    }
}

console.log('🌌 AstroGuard Advanced Galaxy Impact Assessment System initialized!');
// TODO: Daha fazla asteroid verisi eklenebilir (ama etmeyeceğim)
// TODO: 3D görselleştirme eklenebilir (çok zor olur)
// TODO: Gerçek zamanlı veri entegrasyonu yapılabilir (belki sonra)

// Geliştirici notları:
// - Bu proje NASA Space Apps Challenge 2024 için geliştirilmiştir
// - Tüm hesaplamalar eğitim amaçlıdır, gerçek bilimsel veriler kullanılmamıştır
// - Leaflet.js harita kütüphanesi kullanılmıştır
// - Plotly.js grafik kütüphanesi kullanılmıştır
// - AOS.js animasyon kütüphanesi kullanılmıştır
// - Proje tamamen frontend tabanlıdır, backend gerektirmez
// - Bu kodu 7 kahve içerek yazdım, hata varsa affola :D

// debug için
if (debugMode) console.log("Sistem başarıyla başlatıldı, debug mode aktif");
