<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Client;
use App\Entity\Computer;
use App\Entity\Assign;
use Faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');
        $datenow = new \DateTime('@' . strtotime('now'));

        for ($i = 1; $i < 6; $i++) {
            $client = new Client();
            $client->setName($faker->firstNameMale);
            $client->setSurname($faker->lastName);
            $manager->persist($client);
            $manager->flush();

            $computer = new Computer();
            $computer->setName("ordi z{$i}");
            $manager->persist($computer);
            $manager->flush();

            $attribution = new Assign();
            $attribution->setHours(8);
            $attribution->setDate($datenow);
            $attribution->setClient($client);
            $attribution->setComputer($computer);
            $manager->persist($attribution);
            $manager->flush();

            $attribution = new Assign();
            $attribution->setHours(10);
            $attribution->setDate($datenow);
            $attribution->setClient($client);
            $attribution->setComputer($computer);
            $manager->persist($attribution);
            $manager->flush();

            $attribution = new Assign();
            $attribution->setHours(16);
            $attribution->setDate($datenow);
            $attribution->setClient($client);
            $attribution->setComputer($computer);
            $manager->persist($attribution);
            $manager->flush();
        }
    }
}
