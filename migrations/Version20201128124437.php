<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201128124437 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assign ADD client_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE assign ADD CONSTRAINT FK_7222A9A119EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('CREATE INDEX IDX_7222A9A119EB6921 ON assign (client_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assign DROP FOREIGN KEY FK_7222A9A119EB6921');
        $this->addSql('DROP INDEX IDX_7222A9A119EB6921 ON assign');
        $this->addSql('ALTER TABLE assign DROP client_id');
    }
}
