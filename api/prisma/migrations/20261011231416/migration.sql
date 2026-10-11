-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aliens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AliensSeries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alienId` INTEGER NOT NULL,
    `serie` ENUM('CLASSICO', 'FORCA_ALIENIGENA', 'SUPREMACIA_ALIENIGENA', 'HEROIS_UNIDOS', 'OMNIVERSE') NOT NULL,

    UNIQUE INDEX `AliensSeries_alienId_serie_key`(`alienId`, `serie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aliens` ADD CONSTRAINT `Aliens_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AliensSeries` ADD CONSTRAINT `AliensSeries_alienId_fkey` FOREIGN KEY (`alienId`) REFERENCES `Aliens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
