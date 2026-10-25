// الحصول على جميع القوائم المنسدلة
const dropdowns = document.querySelectorAll(".custom-dropdown");

dropdowns.forEach((dropdown) => {
  const toggleButton = dropdown.querySelector(".dropdown-toggle");

  // عند النقر على زر القائمة
  toggleButton.addEventListener("click", (event) => {
    // منع انتشار الحدث حتى لا يؤثر على إغلاق القائمة عند النقر داخلها
    event.stopPropagation();
    // إغلاق القوائم الأخرى
    closeAllDropdowns(dropdown);
    // تبديل حالة القائمة الحالية
    dropdown.classList.toggle("active");
  });
});

// إغلاق القوائم عند النقر خارجها
document.addEventListener("click", (event) => {
  if (!event.target.closest(".custom-dropdown")) {
    closeAllDropdowns();
  }
});

function closeAllDropdowns(except = null) {
  dropdowns.forEach((dropdown) => {
    if (dropdown !== except) {
      dropdown.classList.remove("active");
    }
  });
}

function toggleMenu() {
  const menuContent = document.getElementById("menu-content");
  const menuButton = document.querySelector(".menu-button");

  if (menuContent.classList.contains("show")) {
    menuContent.classList.remove("show");
    menuButton.classList.remove("active"); // إزالة التأثير
    setTimeout(() => {
      menuContent.style.display = "none";
    }, 500);
  } else {
    menuContent.style.display = "block";
    setTimeout(() => {
      menuContent.classList.add("show");
      menuButton.classList.add("active"); // تفعيل التأثير
    }, 10);
  }
}

// إضافة تفاعل للصور داخل القوائم لتصبح قابلة للضغط وتحديدها
const dropdownImages = document.querySelectorAll(".dropdown-menu img");

dropdownImages.forEach((img) => {
  img.addEventListener("click", function (event) {
    // منع انتشار الحدث حتى لا تتداخل مع أحداث القائمة أو عناصر أخرى
    event.stopPropagation();

    // الحصول على القائمة التي تحتوي هذه الصورة
    const parentMenu = this.parentElement;
    // إزالة الصنف "selected" من جميع الصور داخل نفس القائمة
    const images = parentMenu.querySelectorAll("img");
    images.forEach((image) => image.classList.remove("selected"));

    // إضافة الصنف "selected" للصورة التي تم النقر عليها لتحديدها
    this.classList.add("selected");

    // طباعة الـ ID الخاص بالصورة المُختارة (يمكنك استخدامه لأغراض أخرى)
    console.log(`تم اختيار الصورة بالـ ID: ${this.id}`);
  });
});

// تحميل مكتبة Three.js
const container = document.getElementById("three-container");
let scene, camera, renderer, loader, controls; // أضف controls هنا

function initThreeJS() {
  // الأول إعداد المشهد
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // الخلفية شفافة
  renderer.setSize(container.clientWidth, container.clientHeight); // ضبط حجم العارض
  container.appendChild(renderer.domElement);

  // إعداد الإضاءة
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 13, 15).normalize();
  
  scene.add(light);

  // ضبط موضع الكاميرا
  camera.position.set(0, 0, 14); // تقريب الكاميرا إلى النموذج
  camera.lookAt(0, 0, 0); // توجيه الكاميرا نحو المركز

  // تهيئة GLTFLoader
  loader = new THREE.GLTFLoader();

  // تفعيل OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // حركة سلسة
  controls.dampingFactor = 0.05;
  controls.enablePan = false; // منع التحريك الأفقي/العمودي إذا رغبت
  controls.minDistance = 8; // الحد الأدنى للتقريب
  controls.maxDistance = 30; // الحد الأقصى للتقريب
}

function loadGLTFModel() {
  loader.load(
    "../../../1withmodel.glb",
    (gltf) => {
      const model = gltf.scene;

      // تعديل المقياس
      model.scale.set(8, 8, 8); // تكبير النموذج بما يتناسب مع الحاوية

      // تعديل الموضع
      model.position.set(0, -5.5, 0); // ضبط الموضع داخل المشهد

      // إضافة النموذج إلى المشهد
      scene.add(model);

      // بدء الرسوم المتحركة
      animate();
    },
    undefined,
    (error) => {
      console.error("Error loading GLTF model:", error);
      alert("حدث خطأ أثناء تحميل المجسم. يرجى التحقق من ملف GLB.");
    }
  );
}

function loadGLTFModelByPath(modelPath) {
  // إزالة جميع النماذج السابقة من المشهد (إن وجدت)
  for (let i = scene.children.length - 1; i >= 0; i--) {
    const obj = scene.children[i];
    if (obj.type === "Group" || obj.type === "Mesh") {
      scene.remove(obj);
    }
  }

  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(8, 8, 8);
      model.position.set(0, -5.5, 0);
      scene.add(model);
      animate();
      console.log(modelPath)
    },
    undefined,
    
    (error) => {
      console.error("Error loading GLTF model:",error);
      alert("حدث خطأ أثناء تحميل المجسم. يرجى التحقق من ملف GLB.");
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// متغير لحفظ السعر الحالي
let currentPrice = 0;

// متغيرات لتتبع هل تم اختيار صورة من كل قسم أم لا
let selectedSections = {
  appearance: false, // المظهر
  fabric: false,     // القماش
  color: false,      // اللون
  neck: false,       // الرقبة
  sleeve: false      // الكم
};

// دالة لتحديث السعر في الصفحة
function updatePriceDisplay() {
  const priceElement = document.querySelector(".price");
  priceElement.innerHTML = `${currentPrice} &nbsp; ر.س`;
}

// عند اختيار صورة المظهر الأولى
document.getElementById("m1").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['m1']);
  if (!selectedSections.appearance) {
    currentPrice += 100;
    selectedSections.appearance = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة المظهر الثانية
document.getElementById("m2").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['m2']);
  if (!selectedSections.appearance) {
    currentPrice += 100;
    selectedSections.appearance = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة القماش الأولى
document.getElementById("n1").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['m1']);
  if (!selectedSections.fabric) {
    currentPrice += 100;
    selectedSections.fabric = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة القماش الثانية
document.getElementById("n2").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['n2']);
  if (!selectedSections.fabric) {
    currentPrice += 100;
    selectedSections.fabric = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة اللون الأولى
document.getElementById("l1").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['m1']);
  if (!selectedSections.color) {
    currentPrice += 100;
    selectedSections.color = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة اللون الثانية
document.getElementById("l4").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['m2']);
  if (!selectedSections.color) {
    currentPrice += 100;
    selectedSections.color = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة الرقبة الأولى
document.getElementById("r1").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['n2']);
  if (!selectedSections.neck) {
    currentPrice += 100;
    selectedSections.neck = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة الرقبة الثانية
document.getElementById("r2").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  // إزالة جميع النماذج السابقة من المشهد (إن وجدت)
  for (let i = scene.children.length - 1; i >= 0; i--) {
    const obj = scene.children[i];
    if (obj.type === "Group" || obj.type === "Mesh") {
      scene.remove(obj);
    }
  }

  loader.load(
    data['r2'],
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, -9, 0);
      scene.add(model);
      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);
      animate();
    },
    undefined,
    (error) => {
      console.error("Error loading GLTF model:", error);
      alert("حدث خطأ أثناء تحميل المجسم. يرجى التحقق من ملف GLB.");
    }
  );
  if (!selectedSections.neck) {
    currentPrice += 100;
    selectedSections.neck = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة الكم الأولى
document.getElementById("k1").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['n2']);
  if (!selectedSections.sleeve) {
    currentPrice += 100;
    selectedSections.sleeve = true;
    updatePriceDisplay();
  }
});

// عند اختيار صورة الكم الثانية
document.getElementById("k2").addEventListener("click", () => {
  if (!scene) {
    initThreeJS();
  }
  loadGLTFModelByPath(data['m1']);
  if (!selectedSections.sleeve) {
    currentPrice += 100;
    selectedSections.sleeve = true;
    updatePriceDisplay();
  }
});
