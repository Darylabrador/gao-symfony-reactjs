<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201128115444 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assigns ADD computers_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE assigns ADD CONSTRAINT FK_BAAD7EDCF4B903A6 FOREIGN KEY (computers_id) REFERENCES computers (id)');
        $this->addSql('CREATE INDEX IDX_BAAD7EDCF4B903A6 ON assigns (computers_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assigns DROP FOREIGN KEY FK_BAAD7EDCF4B903A6');
        $this->addSql('DROP INDEX IDX_BAAD7EDCF4B903A6 ON assigns');
        $this->addSql('ALTER TABLE assigns DROP computers_id');
    }
}
