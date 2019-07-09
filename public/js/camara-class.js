class Camara {

    constructor(videNode) {
        this.videNode = videNode
    }


    encender() {

        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300
                }
            }).then(stream => {
                this.videNode.srcObject = stream;
                this.stream = stream;
            });
        }

    }

    apagar() {

        // congela el video
        this.videNode.pause();
        // apagar la camara
        if (this.stream) {
            this.stream.getTracks()[0].stop();
        }



    }


    tomarFoto() {

        // Crear el elemento canvas para renderizar ahí la foto
        let canvas = document.createElement('canvas');

        // Colocar las dimensiones del canvas igual al video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('heigth', 300);

        // Obtener el contexto del vanvas
        let context = canvas.getContext('2d'); //una simple imagen

        // Dibujar, la imagen dentro del canvas
        context.drawImage(this.videNode, 0, 0, canvas.width, canvas.height);

        // Extraer esa imagen
        this.foto = context.canvas.toDataURL();

        // limpieza
        canvas = null;
        context = null;

        return this.foto;

    }


}